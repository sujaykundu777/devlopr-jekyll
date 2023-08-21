"use strict";

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

const DEFAULT_OPTIONS = {
  isPrefetchOnly: false,
};
async function asyncRequireImpl(moduleID, paths, options) {
  const loadBundle = global[`${__METRO_GLOBAL_PREFIX__}__loadBundleAsync`];
  if (loadBundle != null) {
    const stringModuleID = String(moduleID);
    if (paths != null) {
      const bundlePath = paths[stringModuleID];
      if (bundlePath != null) {
        // NOTE: Errors will be swallowed by asyncRequire.prefetch
        await loadBundle(bundlePath);
      }
    }
  }
  if (!options.isPrefetchOnly) {
    return require.importAll(moduleID);
  }
  return undefined;
}
async function asyncRequire(moduleID, paths, moduleName) {
  return asyncRequireImpl(moduleID, paths, DEFAULT_OPTIONS);
}
asyncRequire.prefetch = function (moduleID, paths, moduleName) {
  asyncRequireImpl(moduleID, paths, {
    isPrefetchOnly: true,
  }).then(
    () => {},
    () => {}
  );
};
module.exports = asyncRequire;
