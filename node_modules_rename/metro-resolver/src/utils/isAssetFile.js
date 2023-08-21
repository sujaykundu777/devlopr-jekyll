"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = isAssetFile;
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
 * Determine if a file path should be considered an asset file based on the
 * given `assetExts`.
 */
function isAssetFile(filePath, assetExts) {
  const baseName = _path.default.basename(filePath);
  for (let i = baseName.length - 1; i >= 0; i--) {
    if (baseName[i] === ".") {
      const ext = baseName.slice(i + 1);
      if (assetExts.has(ext)) {
        return true;
      }
    }
  }
  return false;
}
