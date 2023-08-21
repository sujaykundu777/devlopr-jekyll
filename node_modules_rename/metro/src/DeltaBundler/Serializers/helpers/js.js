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

const invariant = require("invariant");
const jscSafeUrl = require("jsc-safe-url");
const { addParamsToDefineCall } = require("metro-transform-plugins");
const path = require("path");
function wrapModule(module, options) {
  const output = getJsOutput(module);
  if (output.type.startsWith("js/script")) {
    return output.data.code;
  }
  const params = getModuleParams(module, options);
  return addParamsToDefineCall(output.data.code, ...params);
}
function getModuleParams(module, options) {
  const moduleId = options.createModuleId(module.path);
  const paths = {};
  let hasPaths = false;
  const dependencyMapArray = Array.from(module.dependencies.values()).map(
    (dependency) => {
      const id = options.createModuleId(dependency.absolutePath);
      if (options.includeAsyncPaths && dependency.data.data.asyncType != null) {
        hasPaths = true;
        invariant(
          options.sourceUrl != null,
          "sourceUrl is required when includeAsyncPaths is true"
        );

        // TODO: Only include path if the target is not in the bundle

        // Construct a server-relative URL for the split bundle, propagating
        // most parameters from the main bundle's URL.

        const { searchParams } = new URL(
          jscSafeUrl.toNormalUrl(options.sourceUrl)
        );
        searchParams.set("modulesOnly", "true");
        searchParams.set("runModule", "false");
        const bundlePath = path.relative(
          options.serverRoot,
          dependency.absolutePath
        );
        paths[id] =
          "/" +
          path.join(
            path.dirname(bundlePath),
            // Strip the file extension
            path.basename(bundlePath, path.extname(bundlePath))
          ) +
          ".bundle?" +
          searchParams.toString();
      }
      return id;
    }
  );
  const params = [
    moduleId,
    hasPaths
      ? {
          // $FlowIgnore[not-an-object] Intentionally spreading an array into an object
          ...dependencyMapArray,
          paths,
        }
      : dependencyMapArray,
  ];
  if (options.dev) {
    // Add the relative path of the module to make debugging easier.
    // This is mapped to `module.verboseName` in `require.js`.
    params.push(path.relative(options.projectRoot, module.path));
  }
  return params;
}
function getJsOutput(module) {
  const jsModules = module.output.filter(({ type }) => type.startsWith("js/"));
  invariant(
    jsModules.length === 1,
    `Modules must have exactly one JS output, but ${
      module.path ?? "unknown module"
    } has ${jsModules.length} JS outputs.`
  );
  const jsOutput = jsModules[0];
  invariant(
    Number.isFinite(jsOutput.data.lineCount),
    `JS output must populate lineCount, but ${
      module.path ?? "unknown module"
    } has ${jsOutput.type} output with lineCount '${jsOutput.data.lineCount}'`
  );
  return jsOutput;
}
function isJsModule(module) {
  return module.output.filter(isJsOutput).length > 0;
}
function isJsOutput(output) {
  return output.type.startsWith("js/");
}
module.exports = {
  getJsOutput,
  getModuleParams,
  isJsModule,
  wrapModule,
};
