"use strict";

var _metroFileMap = _interopRequireWildcard(require("metro-file-map"));
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

const ci = require("ci-info");
const path = require("path");
function getIgnorePattern(config) {
  // For now we support both options
  const { blockList, blacklistRE } = config.resolver;
  const ignorePattern = blacklistRE || blockList;

  // If neither option has been set, use default pattern
  if (!ignorePattern) {
    return / ^/;
  }
  const combine = (regexes) =>
    new RegExp(
      regexes
        .map((regex) => "(" + regex.source.replaceAll("/", path.sep) + ")")
        .join("|")
    );

  // If ignorePattern is an array, merge it into one
  if (Array.isArray(ignorePattern)) {
    return combine(ignorePattern);
  }
  return ignorePattern;
}
function createHasteMap(config, options) {
  const dependencyExtractor =
    options?.extractDependencies === false
      ? null
      : config.resolver.dependencyExtractor;
  const computeDependencies = dependencyExtractor != null;
  return _metroFileMap.default.create({
    cacheManagerFactory:
      config?.unstable_fileMapCacheManagerFactory ??
      ((buildParameters) =>
        new _metroFileMap.DiskCacheManager({
          buildParameters,
          cacheDirectory:
            config.fileMapCacheDirectory ?? config.hasteMapCacheDirectory,
          cacheFilePrefix: options?.cacheFilePrefix,
        })),
    perfLoggerFactory: config.unstable_perfLoggerFactory,
    computeDependencies,
    computeSha1: true,
    dependencyExtractor: config.resolver.dependencyExtractor,
    enableSymlinks: config.resolver.unstable_enableSymlinks,
    extensions: Array.from(
      new Set([
        ...config.resolver.sourceExts,
        ...config.resolver.assetExts,
        ...config.watcher.additionalExts,
      ])
    ),
    forceNodeFilesystemAPI: !config.resolver.useWatchman,
    hasteImplModulePath: config.resolver.hasteImplModulePath,
    healthCheck: config.watcher.healthCheck,
    ignorePattern: getIgnorePattern(config),
    maxWorkers: config.maxWorkers,
    mocksPattern: "",
    platforms: config.resolver.platforms,
    retainAllFiles: true,
    resetCache: config.resetCache,
    rootDir: config.projectRoot,
    roots: config.watchFolders,
    throwOnModuleCollision: options?.throwOnModuleCollision ?? true,
    useWatchman: config.resolver.useWatchman,
    watch: options?.watch == null ? !ci.isCI : options.watch,
    watchmanDeferStates: config.watcher.watchman.deferStates,
  });
}
module.exports = createHasteMap;
