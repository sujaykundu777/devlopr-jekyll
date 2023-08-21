"use strict";

var _PackageResolve = require("./PackageResolve");
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
 * Helper used by the `metro` package to create the `ResolutionContext` object.
 * As context values can be overridden by callers, this occurs externally to
 * `resolve.js`.
 */
function createDefaultContext(context) {
  return {
    redirectModulePath: (modulePath) =>
      (0, _PackageResolve.redirectModulePath)(context, modulePath),
    ...context,
  };
}
module.exports = createDefaultContext;
