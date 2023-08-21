"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = toPosixPath;
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

const MATCH_NON_POSIX_PATH_SEPS = new RegExp(
  "\\" + _path.default.win32.sep,
  "g"
);

/**
 * Replace path separators in the passed string to coerce to a POSIX path. This
 * is a no-op on POSIX systems.
 */
function toPosixPath(relativePathOrSpecifier) {
  if (_path.default.sep === _path.default.posix.sep) {
    return relativePathOrSpecifier;
  }
  return relativePathOrSpecifier.replace(
    MATCH_NON_POSIX_PATH_SEPS,
    _path.default.posix.sep
  );
}
