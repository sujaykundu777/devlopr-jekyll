"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.isSubpathDefinedInExports = isSubpathDefinedInExports;
exports.resolvePackageTargetFromExports = resolvePackageTargetFromExports;
var _path = _interopRequireDefault(require("path"));
var _InvalidPackageConfigurationError = _interopRequireDefault(
  require("./errors/InvalidPackageConfigurationError")
);
var _PackagePathNotExportedError = _interopRequireDefault(
  require("./errors/PackagePathNotExportedError")
);
var _resolveAsset = _interopRequireDefault(require("./resolveAsset"));
var _isAssetFile = _interopRequireDefault(require("./utils/isAssetFile"));
var _toPosixPath = _interopRequireDefault(require("./utils/toPosixPath"));
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
 * Resolve a package subpath based on the entry points defined in the package's
 * "exports" field. If there is no match for the given subpath (which may be
 * augmented by resolution of conditional exports for the passed `context`),
 * throws a `PackagePathNotExportedError`.
 *
 * Implements modern package resolution behaviour based on the [Package Entry
 * Points spec](https://nodejs.org/docs/latest-v19.x/api/packages.html#package-entry-points).
 *
 * @throws {InvalidPackageConfigurationError} Raised if configuration specified
 *   by `exportsField` is invalid.
 * @throws {InvalidModuleSpecifierError} Raised if the resolved module specifier
 *   is invalid.
 * @throws {PackagePathNotExportedError} Raised when the requested subpath is
 *   not exported.
 */
function resolvePackageTargetFromExports(
  context,
  /**
   * The path to the containing npm package directory.
   */
  packagePath,
  /**
   * The unresolved absolute path to the target module. This will be converted
   * to a package-relative subpath for comparison.
   */
  modulePath,
  exportsField,
  platform
) {
  const createConfigError = (reason) => {
    return new _InvalidPackageConfigurationError.default({
      reason,
      packagePath,
    });
  };
  const subpath = getExportsSubpath(packagePath, modulePath);
  const exportMap = normalizeExportsField(exportsField, createConfigError);
  if (!isSubpathDefinedInExports(exportMap, subpath)) {
    throw new _PackagePathNotExportedError.default(
      `Attempted to import the module "${modulePath}" which is not listed ` +
        `in the "exports" of "${packagePath}".`
    );
  }
  const { target, patternMatch } = matchSubpathFromExports(
    context,
    subpath,
    exportMap,
    platform,
    createConfigError
  );
  if (target != null) {
    const invalidSegmentInTarget = findInvalidPathSegment(target.slice(2));
    if (invalidSegmentInTarget != null) {
      throw createConfigError(
        `The target for "${subpath}" defined in "exports" is "${target}", ` +
          "however this value is an invalid subpath or subpath pattern " +
          `because it includes "${invalidSegmentInTarget}".`
      );
    }
    const filePath = _path.default.join(
      packagePath,
      patternMatch != null ? target.replace("*", patternMatch) : target
    );
    if ((0, _isAssetFile.default)(filePath, context.assetExts)) {
      const assetResult = (0, _resolveAsset.default)(context, filePath);
      if (assetResult != null) {
        return assetResult;
      }
    }
    if (context.doesFileExist(filePath)) {
      return {
        type: "sourceFile",
        filePath,
      };
    }
    throw createConfigError(
      `The resolution for "${modulePath}" defined in "exports" is ${filePath}, ` +
        "however this file does not exist."
    );
  }
  throw new _PackagePathNotExportedError.default(
    `Attempted to import the module "${modulePath}" which is listed in the ` +
      `"exports" of "${packagePath}", however no match was resolved for this ` +
      `request (platform = ${platform ?? "null"}).`
  );
}

/**
 * Convert a module path to the package-relative subpath key to attempt for
 * "exports" field lookup.
 */
function getExportsSubpath(packagePath, modulePath) {
  const packageSubpath = _path.default.relative(packagePath, modulePath);
  return packageSubpath === ""
    ? "."
    : "./" + (0, _toPosixPath.default)(packageSubpath);
}

/**
 * Normalise an "exports"-like field by parsing string shorthand and conditions
 * shorthand at root, and flattening any legacy Node.js <13.7 array values.
 *
 * See https://nodejs.org/docs/latest-v19.x/api/packages.html#exports-sugar.
 */
function normalizeExportsField(exportsField, createConfigError) {
  let rootValue;
  if (Array.isArray(exportsField)) {
    // If an array of strings, expand as subpath mapping (legacy root shorthand)
    if (exportsField.every((value) => typeof value === "string")) {
      // $FlowIssue[incompatible-call] exportsField is refined to `string[]`
      return exportsField.reduce(
        (result, subpath) => ({
          ...result,
          [subpath]: subpath,
        }),
        {}
      );
    }

    // Otherwise, should be a condition map and fallback string (Node.js <13.7)
    rootValue = exportsField[0];
  } else {
    rootValue = exportsField;
  }
  if (rootValue == null || Array.isArray(rootValue)) {
    throw createConfigError(
      'Could not parse non-standard array value at root of "exports" field.'
    );
  }
  if (typeof rootValue === "string") {
    return {
      ".": rootValue,
    };
  }
  const firstLevelKeys = Object.keys(rootValue);
  const subpathKeys = firstLevelKeys.filter((subpathOrCondition) =>
    subpathOrCondition.startsWith(".")
  );
  if (subpathKeys.length === firstLevelKeys.length) {
    return flattenLegacySubpathValues(rootValue, createConfigError);
  }
  if (subpathKeys.length !== 0) {
    throw createConfigError(
      'The "exports" field cannot have keys which are both subpaths and ' +
        "condition names at the same level."
    );
  }
  return {
    ".": flattenLegacySubpathValues(rootValue, createConfigError),
  };
}

/**
 * Flatten legacy Node.js <13.7 array subpath values in an exports mapping.
 */
function flattenLegacySubpathValues(exportMap, createConfigError) {
  return Object.keys(exportMap).reduce((result, subpath) => {
    const value = exportMap[subpath];

    // We do not support empty or nested arrays (non-standard)
    if (Array.isArray(value) && (!value.length || Array.isArray(value[0]))) {
      throw createConfigError(
        'Could not parse non-standard array value in "exports" field.'
      );
    }
    return {
      ...result,
      [subpath]: Array.isArray(value) ? value[0] : value,
    };
  }, {});
}

/**
 * Identifies whether the given subpath is defined in the given "exports"-like
 * mapping. Does not reduce exports conditions (therefore does not identify
 * whether the subpath is mapped to a value).
 */
function isSubpathDefinedInExports(exportMap, subpath) {
  if (subpath in exportMap) {
    return true;
  }

  // Attempt to match after expanding any subpath pattern keys
  for (const key in exportMap) {
    if (
      key.split("*").length === 2 &&
      matchSubpathPattern(key, subpath) != null
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Get the mapped replacement for the given subpath.
 *
 * Implements modern package resolution behaviour based on the [Package Entry
 * Points spec](https://nodejs.org/docs/latest-v19.x/api/packages.html#package-entry-points).
 */
function matchSubpathFromExports(
  context,
  /**
   * The package-relative subpath (beginning with '.') to match against either
   * an exact subpath key or subpath pattern key in "exports".
   */
  subpath,
  exportMap,
  platform,
  createConfigError
) {
  const conditionNames = new Set([
    "default",
    ...context.unstable_conditionNames,
    ...(platform != null
      ? context.unstable_conditionsByPlatform[platform] ?? []
      : []),
  ]);
  const exportMapAfterConditions = reduceExportMap(
    exportMap,
    conditionNames,
    createConfigError
  );
  let target = exportMapAfterConditions[subpath];
  let patternMatch = null;

  // Attempt to match after expanding any subpath pattern keys
  if (target == null) {
    // Gather keys which are subpath patterns in descending order of specificity
    const expansionKeys = Object.keys(exportMapAfterConditions)
      .filter((key) => key.includes("*"))
      .sort((key) => key.split("*")[0].length)
      .reverse();
    for (const key of expansionKeys) {
      const value = exportMapAfterConditions[key];

      // Skip invalid values (must include a single '*' or be `null`)
      if (typeof value === "string" && value.split("*").length !== 2) {
        break;
      }
      patternMatch = matchSubpathPattern(key, subpath);
      if (patternMatch != null) {
        target = value;
        break;
      }
    }
  }
  return {
    target,
    patternMatch,
  };
}
/**
 * Reduce an "exports"-like mapping to a flat subpath mapping after resolving
 * conditional exports.
 */
function reduceExportMap(exportMap, conditionNames, createConfigError) {
  const result = {};
  for (const subpath in exportMap) {
    const subpathValue = reduceConditionalExport(
      exportMap[subpath],
      conditionNames
    );

    // If a subpath has no resolution for the passed `conditionNames`, do not
    // include it in the result. (This includes only explicit `null` values,
    // which may conditionally hide higher-specificity subpath patterns.)
    if (subpathValue !== "no-match") {
      result[subpath] = subpathValue;
    }
  }
  const invalidValues = Object.values(result).filter(
    (value) => value != null && !value.startsWith("./")
  );
  if (invalidValues.length) {
    throw createConfigError(
      'One or more mappings for subpaths defined in "exports" are invalid. ' +
        'All values must begin with "./".'
    );
  }
  return result;
}

/**
 * Reduce an "exports"-like subpath value after asserting the passed
 * `conditionNames` in any nested conditions.
 *
 * Returns `'no-match'` in the case that none of the asserted `conditionNames`
 * are matched.
 *
 * See https://nodejs.org/docs/latest-v19.x/api/packages.html#conditional-exports.
 */
function reduceConditionalExport(subpathValue, conditionNames) {
  let reducedValue = subpathValue;
  while (reducedValue != null && typeof reducedValue !== "string") {
    let match = "no-match";
    for (const conditionName in reducedValue) {
      if (conditionNames.has(conditionName)) {
        match = reducedValue[conditionName];
        break;
      }
    }
    reducedValue = match;
  }
  return reducedValue;
}

/**
 * If a subpath pattern expands to the passed subpath, return the subpath match
 * (value to substitute for '*'). Otherwise, return `null`.
 *
 * See https://nodejs.org/docs/latest-v19.x/api/packages.html#subpath-patterns.
 */
function matchSubpathPattern(subpathPattern, subpath) {
  const [patternBase, patternTrailer] = subpathPattern.split("*");
  if (subpath.startsWith(patternBase) && subpath.endsWith(patternTrailer)) {
    return subpath.substring(
      patternBase.length,
      subpath.length - patternTrailer.length
    );
  }
  return null;
}
function findInvalidPathSegment(subpath) {
  for (const segment of subpath.split(/[\\/]/)) {
    if (
      segment === "" ||
      segment === "." ||
      segment === ".." ||
      segment === "node_modules"
    ) {
      return segment;
    }
  }
  return null;
}
