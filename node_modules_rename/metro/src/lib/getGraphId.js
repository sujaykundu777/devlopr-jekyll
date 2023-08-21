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

const canonicalize = require("metro-core/src/canonicalize");
function getGraphId(
  entryFile,
  options,
  { shallow, lazy, unstable_allowRequireContext, resolverOptions }
) {
  return JSON.stringify(
    {
      entryFile,
      options: {
        customResolverOptions: resolverOptions.customResolverOptions ?? {},
        customTransformOptions: options.customTransformOptions ?? null,
        dev: options.dev,
        experimentalImportSupport: options.experimentalImportSupport || false,
        hot: options.hot,
        minify: options.minify,
        unstable_disableES6Transforms: options.unstable_disableES6Transforms,
        platform: options.platform != null ? options.platform : null,
        type: options.type,
        lazy,
        unstable_allowRequireContext,
        shallow,
        unstable_transformProfile:
          options.unstable_transformProfile || "default",
      },
    },
    canonicalize
  );
}
module.exports = getGraphId;
