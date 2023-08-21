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
  isClass: true,
  isPropertyDefinitionWithNonComputedName: true,
  isClassMember: true,
  isClassMemberWithNonComputedName: true,
  isComment: true,
  isFunction: true,
  isMethodDefinitionWithNonComputedName: true,
  isMemberExpressionWithNonComputedProperty: true,
  isOptionalMemberExpressionWithNonComputedProperty: true,
  isObjectPropertyWithShorthand: true,
  isObjectPropertyWithNonComputedName: true,
  isBigIntLiteral: true,
  isBooleanLiteral: true,
  isNullLiteral: true,
  isNumericLiteral: true,
  isRegExpLiteral: true,
  isStringLiteral: true,
  isExpression: true,
  isStatement: true
};
exports.isBigIntLiteral = isBigIntLiteral;
exports.isBooleanLiteral = isBooleanLiteral;
exports.isClass = isClass;
exports.isClassMember = isClassMember;
exports.isClassMemberWithNonComputedName = isClassMemberWithNonComputedName;
exports.isComment = isComment;
exports.isExpression = isExpression;
exports.isFunction = isFunction;
exports.isMemberExpressionWithNonComputedProperty = isMemberExpressionWithNonComputedProperty;
exports.isMethodDefinitionWithNonComputedName = isMethodDefinitionWithNonComputedName;
exports.isNullLiteral = isNullLiteral;
exports.isNumericLiteral = isNumericLiteral;
exports.isObjectPropertyWithNonComputedName = isObjectPropertyWithNonComputedName;
exports.isObjectPropertyWithShorthand = isObjectPropertyWithShorthand;
exports.isOptionalMemberExpressionWithNonComputedProperty = isOptionalMemberExpressionWithNonComputedProperty;
exports.isPropertyDefinitionWithNonComputedName = isPropertyDefinitionWithNonComputedName;
exports.isRegExpLiteral = isRegExpLiteral;
exports.isStatement = isStatement;
exports.isStringLiteral = isStringLiteral;

var _predicates = require("./generated/predicates");

Object.keys(_predicates).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _predicates[key]) return;
  exports[key] = _predicates[key];
});

function isClass(node) {
  return (0, _predicates.isClassDeclaration)(node) || (0, _predicates.isClassExpression)(node);
}

function isPropertyDefinitionWithNonComputedName(node) {
  return (0, _predicates.isPropertyDefinition)(node) && node.computed === false;
}

function isClassMember(node) {
  return (0, _predicates.isPropertyDefinition)(node) || (0, _predicates.isMethodDefinition)(node);
}

function isClassMemberWithNonComputedName(node) {
  return isClassMember(node) && node.computed === false;
}

function isComment(node) {
  return (0, _predicates.isBlockComment)(node) || (0, _predicates.isLineComment)(node);
}

function isFunction(node) {
  return (0, _predicates.isArrowFunctionExpression)(node) || (0, _predicates.isFunctionDeclaration)(node) || (0, _predicates.isFunctionExpression)(node);
}

function isMethodDefinitionWithNonComputedName(node) {
  return (0, _predicates.isMethodDefinition)(node) && node.computed === false;
}

function isMemberExpressionWithNonComputedProperty(node) {
  return (0, _predicates.isMemberExpression)(node) && node.computed === false;
}

function isOptionalMemberExpressionWithNonComputedProperty(node) {
  return (0, _predicates.isMemberExpression)(node) && node.computed === false;
}

function isObjectPropertyWithShorthand(node) {
  return (0, _predicates.isProperty)(node) && node.shorthand === true;
}

function isObjectPropertyWithNonComputedName(node) {
  return (0, _predicates.isProperty)(node) && node.computed === false;
}

function isBigIntLiteral(node) {
  return (0, _predicates.isLiteral)(node) && node.literalType === 'bigint';
}

function isBooleanLiteral(node) {
  return (0, _predicates.isLiteral)(node) && node.literalType === 'boolean';
}

function isNullLiteral(node) {
  return (0, _predicates.isLiteral)(node) && node.literalType === 'null';
}

function isNumericLiteral(node) {
  return (0, _predicates.isLiteral)(node) && node.literalType === 'numeric';
}

function isRegExpLiteral(node) {
  return (0, _predicates.isLiteral)(node) && node.literalType === 'regexp';
}

function isStringLiteral(node) {
  return (0, _predicates.isLiteral)(node) && node.literalType === 'string';
}

function isExpression(node) {
  return (0, _predicates.isThisExpression)(node) || (0, _predicates.isArrayExpression)(node) || (0, _predicates.isObjectExpression)(node) || (0, _predicates.isFunctionExpression)(node) || (0, _predicates.isArrowFunctionExpression)(node) || (0, _predicates.isYieldExpression)(node) || (0, _predicates.isLiteral)(node) || (0, _predicates.isUnaryExpression)(node) || (0, _predicates.isUpdateExpression)(node) || (0, _predicates.isBinaryExpression)(node) || (0, _predicates.isAssignmentExpression)(node) || (0, _predicates.isLogicalExpression)(node) || (0, _predicates.isMemberExpression)(node) || (0, _predicates.isConditionalExpression)(node) || (0, _predicates.isCallExpression)(node) || (0, _predicates.isNewExpression)(node) || (0, _predicates.isSequenceExpression)(node) || (0, _predicates.isTemplateLiteral)(node) || (0, _predicates.isTaggedTemplateExpression)(node) || (0, _predicates.isClassExpression)(node) || (0, _predicates.isMetaProperty)(node) || (0, _predicates.isIdentifier)(node) || (0, _predicates.isAwaitExpression)(node) || (0, _predicates.isImportExpression)(node) || (0, _predicates.isChainExpression)(node) || (0, _predicates.isTypeCastExpression)(node) || (0, _predicates.isJSXFragment)(node) || (0, _predicates.isJSXElement)(node);
}

function isStatement(node) {
  return (0, _predicates.isBlockStatement)(node) || (0, _predicates.isBreakStatement)(node) || (0, _predicates.isClassDeclaration)(node) || (0, _predicates.isContinueStatement)(node) || (0, _predicates.isDebuggerStatement)(node) || (0, _predicates.isDeclareClass)(node) || (0, _predicates.isDeclareVariable)(node) || (0, _predicates.isDeclareFunction)(node) || (0, _predicates.isDeclareInterface)(node) || (0, _predicates.isDeclareModule)(node) || (0, _predicates.isDeclareOpaqueType)(node) || (0, _predicates.isDeclareTypeAlias)(node) || (0, _predicates.isDoWhileStatement)(node) || (0, _predicates.isEmptyStatement)(node) || (0, _predicates.isEnumDeclaration)(node) || (0, _predicates.isExpressionStatement)(node) || (0, _predicates.isForInStatement)(node) || (0, _predicates.isForOfStatement)(node) || (0, _predicates.isForStatement)(node) || (0, _predicates.isFunctionDeclaration)(node) || (0, _predicates.isIfStatement)(node) || (0, _predicates.isInterfaceDeclaration)(node) || (0, _predicates.isLabeledStatement)(node) || (0, _predicates.isOpaqueType)(node) || (0, _predicates.isReturnStatement)(node) || (0, _predicates.isSwitchStatement)(node) || (0, _predicates.isThrowStatement)(node) || (0, _predicates.isTryStatement)(node) || (0, _predicates.isTypeAlias)(node) || (0, _predicates.isVariableDeclaration)(node) || (0, _predicates.isWhileStatement)(node) || (0, _predicates.isWithStatement)(node);
}