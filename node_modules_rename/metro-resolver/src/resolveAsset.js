"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = resolveAsset;
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
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

/**
 * Resolve a file path as an asset. Returns the set of files found after
 * expanding asset resolutions (e.g. `icon@2x.png`). Users may override this
 * behaviour via `context.resolveAsset`.
 */
function resolveAsset(context, filePath) {
  const dirPath = _path.default.dirname(filePath);
  const extension = _path.default.extname(filePath);
  const basename = _path.default.basename(filePath, extension);
  try {
    if (!/@\d+(?:\.\d+)?x$/.test(basename)) {
      const assets = context.resolveAsset(dirPath, basename, extension);
      if (assets != null) {
        return {
          type: "assetFiles",
          filePaths: assets,
        };
      }
    }
  } catch (e) {}
  return null;
}
