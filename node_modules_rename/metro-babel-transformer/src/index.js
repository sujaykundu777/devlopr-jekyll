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

const { parseSync, transformFromAstSync } = require("@babel/core");
const nullthrows = require("nullthrows");
function transform({ filename, options, plugins, src }) {
  const OLD_BABEL_ENV = process.env.BABEL_ENV;
  process.env.BABEL_ENV = options.dev
    ? "development"
    : process.env.BABEL_ENV || "production";
  try {
    const babelConfig = {
      caller: {
        name: "metro",
        bundler: "metro",
        platform: options.platform,
      },
      ast: true,
      babelrc: options.enableBabelRCLookup,
      code: false,
      cwd: options.projectRoot,
      highlightCode: true,
      filename,
      plugins,
      sourceType: "module",
      // NOTE(EvanBacon): We split the parse/transform steps up to accommodate
      // Hermes parsing, but this defaults to cloning the AST which increases
      // the transformation time by a fair amount.
      // You get this behavior by default when using Babel's `transform` method directly.
      cloneInputAst: false,
    };
    const sourceAst = options.hermesParser
      ? require("hermes-parser").parse(src, {
          babel: true,
          sourceType: babelConfig.sourceType,
        })
      : parseSync(src, babelConfig);
    const transformResult = transformFromAstSync(sourceAst, src, babelConfig);
    return {
      ast: nullthrows(transformResult.ast),
      metadata: transformResult.metadata,
    };
  } finally {
    if (OLD_BABEL_ENV) {
      process.env.BABEL_ENV = OLD_BABEL_ENV;
    }
  }
}
module.exports = {
  transform,
};
