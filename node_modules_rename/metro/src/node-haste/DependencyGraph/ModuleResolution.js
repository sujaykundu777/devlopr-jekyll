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

const { codeFrameColumns } = require("@babel/code-frame");
const fs = require("fs");
const invariant = require("invariant");
const Resolver = require("metro-resolver");
const createDefaultContext = require("metro-resolver/src/createDefaultContext");
const path = require("path");
const util = require("util");
class ModuleResolver {
  // A module representing the project root, used as the origin when resolving `emptyModulePath`.

  // An empty module, the result of resolving `emptyModulePath` from the project root.

  constructor(options) {
    this._options = options;
    const { projectRoot, moduleCache } = this._options;
    this._projectRootFakeModule = {
      path: path.join(projectRoot, "_"),
      getPackage: () =>
        moduleCache.getPackageOf(this._projectRootFakeModule.path),
      isHaste() {
        throw new Error("not implemented");
      },
      getName() {
        throw new Error("not implemented");
      },
    };
  }
  _getEmptyModule() {
    let emptyModule = this._cachedEmptyModule;
    if (!emptyModule) {
      emptyModule = this.resolveDependency(
        this._projectRootFakeModule,
        this._options.emptyModulePath,
        false,
        null,
        /* resolverOptions */ {}
      );
      this._cachedEmptyModule = emptyModule;
    }
    return emptyModule;
  }
  resolveDependency(
    fromModule,
    moduleName,
    allowHaste,
    platform,
    resolverOptions
  ) {
    const {
      assetExts,
      disableHierarchicalLookup,
      doesFileExist,
      extraNodeModules,
      mainFields,
      nodeModulesPaths,
      preferNativePlatform,
      resolveAsset,
      resolveRequest,
      sourceExts,
      unstable_conditionNames,
      unstable_conditionsByPlatform,
      unstable_enablePackageExports,
      unstable_getRealPath,
    } = this._options;
    try {
      const result = Resolver.resolve(
        createDefaultContext({
          allowHaste,
          assetExts,
          disableHierarchicalLookup,
          doesFileExist,
          extraNodeModules,
          mainFields,
          nodeModulesPaths,
          preferNativePlatform,
          resolveAsset,
          resolveRequest,
          sourceExts,
          unstable_conditionNames,
          unstable_conditionsByPlatform,
          unstable_enablePackageExports,
          unstable_getRealPath,
          unstable_logWarning: this._logWarning,
          customResolverOptions: resolverOptions.customResolverOptions ?? {},
          originModulePath: fromModule.path,
          resolveHasteModule: (name) =>
            this._options.getHasteModulePath(name, platform),
          resolveHastePackage: (name) =>
            this._options.getHastePackagePath(name, platform),
          getPackage: this._getPackage,
          getPackageForModule: (modulePath) =>
            this._getPackageForModule(fromModule, modulePath),
        }),
        moduleName,
        platform
      );
      return this._getFileResolvedModule(result);
    } catch (error) {
      if (error instanceof Resolver.FailedToResolvePathError) {
        const { candidates } = error;
        throw new UnableToResolveError(
          fromModule.path,
          moduleName,
          [
            "\n\nNone of these files exist:",
            `  * ${Resolver.formatFileCandidates(
              this._removeRoot(candidates.file)
            )}`,
            `  * ${Resolver.formatFileCandidates(
              this._removeRoot(candidates.dir)
            )}`,
          ].join("\n"),
          {
            cause: error,
          }
        );
      }
      if (error instanceof Resolver.FailedToResolveNameError) {
        const dirPaths = error.dirPaths;
        const extraPaths = error.extraPaths;
        const displayDirPaths = dirPaths
          .filter((dirPath) => this._options.dirExists(dirPath))
          .map((dirPath) => path.relative(this._options.projectRoot, dirPath))
          .concat(extraPaths);
        const hint = displayDirPaths.length ? " or in these directories:" : "";
        throw new UnableToResolveError(
          fromModule.path,
          moduleName,
          [
            `${moduleName} could not be found within the project${hint || "."}`,
            ...displayDirPaths.map((dirPath) => `  ${dirPath}`),
          ].join("\n"),
          {
            cause: error,
          }
        );
      }
      throw error;
    }
  }
  _getPackage = (packageJsonPath) => {
    try {
      return this._options.moduleCache.getPackage(packageJsonPath).read();
    } catch (e) {
      // Do nothing. The standard module cache does not trigger any error, but
      // the ModuleGraph one does, if the module does not exist.
    }
    return null;
  };
  _getPackageForModule = (fromModule, modulePath) => {
    let pkg;
    try {
      pkg = this._options.moduleCache.getPackageOf(modulePath);
    } catch (e) {
      // Do nothing. The standard module cache does not trigger any error, but
      // the ModuleGraph one does, if the module does not exist.
    }
    return pkg != null
      ? {
          rootPath: path.dirname(pkg.path),
          packageJson: pkg.read(),
        }
      : null;
  };

  /**
   * TODO: Return Resolution instead of coercing to BundlerResolution here
   */
  _getFileResolvedModule(resolution) {
    switch (resolution.type) {
      case "sourceFile":
        return resolution;
      case "assetFiles":
        // FIXME: we should forward ALL the paths/metadata,
        // not just an arbitrary item!
        const arbitrary = getArrayLowestItem(resolution.filePaths);
        invariant(arbitrary != null, "invalid asset resolution");
        return {
          type: "sourceFile",
          filePath: arbitrary,
        };
      case "empty":
        return this._getEmptyModule();
      default:
        resolution.type;
        throw new Error("invalid type");
    }
  }
  _logWarning = (message) => {
    this._options.reporter.update({
      type: "resolver_warning",
      message,
    });
  };
  _removeRoot(candidates) {
    if (candidates.filePathPrefix) {
      candidates.filePathPrefix = path.relative(
        this._options.projectRoot,
        candidates.filePathPrefix
      );
    }
    return candidates;
  }
}
function getArrayLowestItem(a) {
  if (a.length === 0) {
    return undefined;
  }
  let lowest = a[0];
  for (let i = 1; i < a.length; ++i) {
    if (a[i] < lowest) {
      lowest = a[i];
    }
  }
  return lowest;
}
class UnableToResolveError extends Error {
  /**
   * File path of the module that tried to require a module, ex. `/js/foo.js`.
   */

  /**
   * The name of the module that was required, no necessarily a path,
   * ex. `./bar`, or `invariant`.
   */

  /**
   * Original error that causes this error
   */

  constructor(originModulePath, targetModuleName, message, options) {
    super();
    this.originModulePath = originModulePath;
    this.targetModuleName = targetModuleName;
    const codeFrameMessage = this.buildCodeFrameMessage();
    this.message =
      util.format(
        "Unable to resolve module %s from %s: %s",
        targetModuleName,
        originModulePath,
        message
      ) + (codeFrameMessage ? "\n" + codeFrameMessage : "");
    this.cause = options?.cause;
  }
  buildCodeFrameMessage() {
    let file;
    try {
      file = fs.readFileSync(this.originModulePath, "utf8");
    } catch (error) {
      if (error.code === "ENOENT" || error.code === "EISDIR") {
        // We're probably dealing with a virtualised file system where
        // `this.originModulePath` doesn't actually exist on disk.
        // We can't show a code frame, but there's no need to let this I/O
        // error shadow the original module resolution error.
        return null;
      }
      throw error;
    }
    const lines = file.split("\n");
    let lineNumber = 0;
    let column = -1;
    for (let line = 0; line < lines.length; line++) {
      const columnLocation = lines[line].lastIndexOf(this.targetModuleName);
      if (columnLocation >= 0) {
        lineNumber = line;
        column = columnLocation;
        break;
      }
    }
    return codeFrameColumns(
      fs.readFileSync(this.originModulePath, "utf8"),
      {
        start: {
          column: column + 1,
          line: lineNumber + 1,
        },
      },
      {
        forceColor: process.env.NODE_ENV !== "test",
      }
    );
  }
}
module.exports = {
  ModuleResolver,
  UnableToResolveError,
};
