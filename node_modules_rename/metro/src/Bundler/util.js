/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 * @oncall react_native
 */

"use strict";

const babylon = require("@babel/parser");
const template = require("@babel/template").default;
const babelTypes = require("@babel/types");
const assetPropertyBlockList = new Set(["files", "fileSystemLocation", "path"]);
function generateAssetCodeFileAst(assetRegistryPath, assetDescriptor) {
  const properDescriptor = filterObject(
    assetDescriptor,
    assetPropertyBlockList
  );

  // {...}
  const descriptorAst = babylon.parseExpression(
    JSON.stringify(properDescriptor)
  );
  const t = babelTypes;

  // require('AssetRegistry').registerAsset({...})
  const buildRequire = template.statement(`
    module.exports = require(ASSET_REGISTRY_PATH).registerAsset(DESCRIPTOR_AST)
  `);
  return t.file(
    t.program([
      buildRequire({
        ASSET_REGISTRY_PATH: t.stringLiteral(assetRegistryPath),
        DESCRIPTOR_AST: descriptorAst,
      }),
    ])
  );
}
function filterObject(object, blockList) {
  const copied = {
    ...object,
  };
  for (const key of blockList) {
    // $FlowFixMe[prop-missing]
    delete copied[key];
  }
  return copied;
}
function createRamBundleGroups(ramGroups, groupableModules, subtree) {
  // build two maps that allow to lookup module data
  // by path or (numeric) module id;
  const byPath = new Map();
  const byId = new Map();
  groupableModules.forEach((m) => {
    byPath.set(m.sourcePath, m);
    byId.set(m.id, m.sourcePath);
  });

  // build a map of group root IDs to an array of module IDs in the group
  const result = new Map(
    ramGroups.map((modulePath) => {
      const root = byPath.get(modulePath);
      if (root == null) {
        throw Error(`Group root ${modulePath} is not part of the bundle`);
      }
      return [
        root.id,
        // `subtree` yields the IDs of all transitive dependencies of a module
        new Set(subtree(root, byPath)),
      ];
    })
  );
  if (ramGroups.length > 1) {
    // build a map of all grouped module IDs to an array of group root IDs
    const all = new ArrayMap();
    for (const [parent, children] of result) {
      for (const module of children) {
        all.get(module).push(parent);
      }
    }

    // find all module IDs that are part of more than one group
    const doubles = filter(all, ([, parents]) => parents.length > 1);
    for (const [moduleId, parents] of doubles) {
      // $FlowFixMe[method-unbinding] added when improving typing for this parameters
      const parentNames = parents.map(byId.get, byId);
      const lastName = parentNames.pop();
      throw new Error(
        `Module ${
          byId.get(moduleId) || moduleId
        } belongs to groups ${parentNames.join(", ")}, and ${String(
          lastName
        )}. Ensure that each module is only part of one group.`
      );
    }
  }
  return result;
}
function* filter(iterator, predicate) {
  for (const value of iterator) {
    if (predicate(value)) {
      yield value;
    }
  }
}
class ArrayMap extends Map {
  get(key) {
    let array = super.get(key);
    if (!array) {
      array = [];
      this.set(key, array);
    }
    return array;
  }
}
module.exports = {
  createRamBundleGroups,
  generateAssetCodeFileAst,
};
