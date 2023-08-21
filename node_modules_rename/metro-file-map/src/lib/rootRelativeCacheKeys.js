"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = rootRelativeCacheKeys;
var fastPath = _interopRequireWildcard(require("./fast_path"));
var _crypto = require("crypto");
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
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

function moduleCacheKey(modulePath) {
  if (modulePath == null) {
    return null;
  }
  // $FlowFixMe[unsupported-syntax] - Dynamic require
  const moduleExports = require(modulePath);
  if (typeof moduleExports?.getCacheKey !== "function") {
    console.warn(
      `metro-file-map: Expected \`${modulePath}\` to export ` +
        "`getCacheKey: () => string`"
    );
    return null;
  }
  return moduleExports.getCacheKey();
}
function rootRelativeCacheKeys(buildParameters) {
  const { rootDir, ...otherParameters } = buildParameters;
  const rootDirHash = (0, _crypto.createHash)("md5")
    .update(rootDir)
    .digest("hex");
  const cacheComponents = Object.keys(otherParameters)
    .sort()
    .map((key) => {
      switch (key) {
        case "roots":
          return buildParameters[key].map((root) =>
            fastPath.relative(rootDir, root)
          );
        case "cacheBreaker":
        case "extensions":
        case "computeDependencies":
        case "computeSha1":
        case "enableSymlinks":
        case "forceNodeFilesystemAPI":
        case "platforms":
        case "retainAllFiles":
        case "skipPackageJson":
          return buildParameters[key] ?? null;
        case "mocksPattern":
          return buildParameters[key]?.toString() ?? null;
        case "ignorePattern":
          return buildParameters[key].toString();
        case "hasteImplModulePath":
        case "dependencyExtractor":
          return moduleCacheKey(buildParameters[key]);
        default:
          key;
          throw new Error("Unrecognised key in build parameters: " + key);
      }
    });

  // JSON.stringify is stable here because we only deal in (nested) arrays of
  // primitives. Use a different approach if this is expanded to include
  // objects/Sets/Maps, etc.
  const relativeConfigHash = (0, _crypto.createHash)("md5")
    .update(JSON.stringify(cacheComponents))
    .digest("hex");
  return {
    rootDirHash,
    relativeConfigHash,
  };
}
