/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  parse: true,
  mutateESTreeASTForPrettier: true,
  FlowVisitorKeys: true,
  astArrayMutationHelpers: true,
  astNodeMutationHelpers: true
};
exports.mutateESTreeASTForPrettier = exports.astNodeMutationHelpers = exports.astArrayMutationHelpers = void 0;
exports.parse = parse;

var HermesParser = _interopRequireWildcard(require("./HermesParser"));

var _HermesToBabelAdapter = _interopRequireDefault(require("./HermesToBabelAdapter"));

var _HermesToESTreeAdapter = _interopRequireDefault(require("./HermesToESTreeAdapter"));

var _ESTreeVisitorKeys = _interopRequireDefault(require("./generated/ESTreeVisitorKeys"));

exports.FlowVisitorKeys = _ESTreeVisitorKeys.default;

var _SimpleTraverser = require("./traverse/SimpleTraverser");

Object.keys(_SimpleTraverser).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _SimpleTraverser[key]) return;
  exports[key] = _SimpleTraverser[key];
});

var _SimpleTransform = require("./transform/SimpleTransform");

Object.keys(_SimpleTransform).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _SimpleTransform[key]) return;
  exports[key] = _SimpleTransform[key];
});

var _getVisitorKeys = require("./traverse/getVisitorKeys");

Object.keys(_getVisitorKeys).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _getVisitorKeys[key]) return;
  exports[key] = _getVisitorKeys[key];
});

var _astArrayMutationHelpers = _interopRequireWildcard(require("./transform/astArrayMutationHelpers"));

exports.astArrayMutationHelpers = _astArrayMutationHelpers;

var _astNodeMutationHelpers = _interopRequireWildcard(require("./transform/astNodeMutationHelpers"));

exports.astNodeMutationHelpers = _astNodeMutationHelpers;

var _mutateESTreeASTForPrettier = _interopRequireDefault(require("./utils/mutateESTreeASTForPrettier"));

exports.mutateESTreeASTForPrettier = _mutateESTreeASTForPrettier.default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DEFAULTS = {
  flow: 'detect'
};

function getOptions(options = { ...DEFAULTS
}) {
  // Default to detecting whether to parse Flow syntax by the presence
  // of an  pragma.
  if (options.flow == null) {
    options.flow = DEFAULTS.flow;
  } else if (options.flow !== 'all' && options.flow !== 'detect') {
    throw new Error('flow option must be "all" or "detect"');
  }

  if (options.sourceType === 'unambiguous') {
    // Clear source type so that it will be detected from the contents of the file
    delete options.sourceType;
  } else if (options.sourceType != null && options.sourceType !== 'script' && options.sourceType !== 'module') {
    throw new Error('sourceType option must be "script", "module", or "unambiguous" if set');
  }

  options.tokens = options.tokens === true;
  options.allowReturnOutsideFunction = options.allowReturnOutsideFunction === true;
  return options;
}

function getAdapter(options, code) {
  return options.babel === true ? new _HermesToBabelAdapter.default(options) : new _HermesToESTreeAdapter.default(options, code);
} // $FlowExpectedError[unclear-type]


// eslint-disable-next-line no-redeclare
function parse(code, opts) {
  const options = getOptions(opts);
  const ast = HermesParser.parse(code, options);
  const adapter = getAdapter(options, code);
  return adapter.transform(ast);
}