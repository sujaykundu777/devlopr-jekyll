"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;
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
 * Raised when a package contains an invalid `package.json` configuration.
 */
class InvalidPackageConfigurationError extends Error {
  /**
   * The description of the error cause.
   */

  /**
   * Absolute path of the package being resolved.
   */

  constructor(opts) {
    super(
      `The package ${opts.packagePath} contains an invalid package.json ` +
        "configuration. Consider raising this issue with the package " +
        "maintainer(s).\nReason: " +
        opts.reason
    );
    Object.assign(this, opts);
  }
}
exports.default = InvalidPackageConfigurationError;
