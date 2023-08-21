"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;
var _constants = _interopRequireDefault(require("../constants"));
var fastPath = _interopRequireWildcard(require("../lib/fast_path"));
var _invariant = _interopRequireDefault(require("invariant"));
var _path = _interopRequireDefault(require("path"));
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 *
 */

// Terminology:
//
// mixedPath - a root-relative or absolute path
// relativePath - a root-relative path
// normalPath - a root-relative, normalised path (no extraneous '.' or '..')
// canonicalPath - a root-relative, normalised, real path (no symlinks in dirname)

class TreeFS {
  #rootDir;
  #files;
  #rootNode = new Map();
  constructor({ rootDir, files }) {
    this.#rootDir = rootDir;
    this.#files = files;
    this.bulkAddOrModify(files);
  }
  getSerializableSnapshot() {
    return new Map(Array.from(this.#files.entries(), ([k, v]) => [k, [...v]]));
  }
  getModuleName(mixedPath) {
    const fileMetadata = this._getFileData(mixedPath);
    return (fileMetadata && fileMetadata[_constants.default.ID]) ?? null;
  }
  getSize(mixedPath) {
    const fileMetadata = this._getFileData(mixedPath);
    return (fileMetadata && fileMetadata[_constants.default.SIZE]) ?? null;
  }
  getDependencies(mixedPath) {
    const fileMetadata = this._getFileData(mixedPath);
    if (fileMetadata) {
      return fileMetadata[_constants.default.DEPENDENCIES]
        ? fileMetadata[_constants.default.DEPENDENCIES].split(
            _constants.default.DEPENDENCY_DELIM
          )
        : [];
    } else {
      return null;
    }
  }
  getSha1(mixedPath) {
    const fileMetadata = this._getFileData(mixedPath);
    return (fileMetadata && fileMetadata[_constants.default.SHA1]) ?? null;
  }
  exists(mixedPath) {
    const result = this._getFileData(mixedPath);
    return result != null;
  }
  getAllFiles() {
    return Array.from(this._regularFileIterator(), (normalPath) =>
      this._normalToAbsolutePath(normalPath)
    );
  }
  linkStats(mixedPath) {
    const fileMetadata = this._getFileData(mixedPath, {
      followLeaf: false,
    });
    if (fileMetadata == null) {
      return null;
    }
    const fileType = fileMetadata[_constants.default.SYMLINK] === 0 ? "f" : "l";
    const modifiedTime = fileMetadata[_constants.default.MTIME];
    return {
      fileType,
      modifiedTime,
    };
  }
  matchFiles(pattern) {
    const regexpPattern =
      pattern instanceof RegExp ? pattern : new RegExp(pattern);
    const files = [];
    for (const filePath of this._pathIterator()) {
      const absolutePath = this._normalToAbsolutePath(filePath);
      if (regexpPattern.test(absolutePath)) {
        files.push(absolutePath);
      }
    }
    return files;
  }

  /**
   * Given a search context, return a list of file paths matching the query.
   * The query matches against normalized paths which start with `./`,
   * for example: `a/b.js` -> `./a/b.js`
   */
  matchFilesWithContext(root, context) {
    const normalRoot = this._normalizePath(root);
    const contextRootResult = this._lookupByNormalPath(normalRoot);
    if (!contextRootResult) {
      return [];
    }
    const { canonicalPath: rootRealPath, node: contextRoot } =
      contextRootResult;
    if (!(contextRoot instanceof Map)) {
      return [];
    }
    const contextRootAbsolutePath =
      rootRealPath === ""
        ? this.#rootDir
        : _path.default.join(this.#rootDir, rootRealPath);
    const files = [];
    const prefix = "./";
    for (const relativePosixPath of this._pathIterator({
      pathSep: "/",
      recursive: context.recursive,
      rootNode: contextRoot,
      subtreeOnly: true,
    })) {
      if (
        context.filter.test(
          // NOTE(EvanBacon): Ensure files start with `./` for matching purposes
          // this ensures packages work across Metro and Webpack (ex: Storybook for React DOM / React Native).
          // `a/b.js` -> `./a/b.js`
          prefix + relativePosixPath
        )
      ) {
        const relativePath =
          _path.default.sep === "/"
            ? relativePosixPath
            : relativePosixPath.replaceAll("/", _path.default.sep);
        files.push(contextRootAbsolutePath + _path.default.sep + relativePath);
      }
    }
    return files;
  }
  getRealPath(mixedPath) {
    const normalPath = this._normalizePath(mixedPath);
    const metadata = this.#files.get(normalPath);
    if (metadata && metadata[_constants.default.SYMLINK] === 0) {
      return fastPath.resolve(this.#rootDir, normalPath);
    }
    const result = this._lookupByNormalPath(normalPath, {
      followLeaf: true,
    });
    if (!result || result.node instanceof Map) {
      return null;
    }
    return fastPath.resolve(this.#rootDir, result.canonicalPath);
  }
  addOrModify(mixedPath, metadata) {
    const normalPath = this._normalizePath(mixedPath);
    // Walk the tree to find the *real* path of the parent node, creating
    // directories as we need.
    const parentDirNode = this._lookupByNormalPath(
      _path.default.dirname(normalPath),
      {
        makeDirectories: true,
      }
    );
    if (!parentDirNode) {
      throw new Error(
        `TreeFS: Failed to make parent directory entry for ${mixedPath}`
      );
    }
    // Normalize the resulting path to account for the parent node being root.
    const canonicalPath = this._normalizePath(
      parentDirNode.canonicalPath +
        _path.default.sep +
        _path.default.basename(normalPath)
    );
    this.bulkAddOrModify(new Map([[canonicalPath, metadata]]));
  }
  bulkAddOrModify(addedOrModifiedFiles) {
    const files = this.#files;

    // Optimisation: Bulk FileData are typically clustered by directory, so we
    // optimise for that case by remembering the last directory we looked up.
    // Experiments with large result sets show this to be significantly (~30%)
    // faster than caching all lookups in a Map, and 70% faster than no cache.
    let lastDir;
    let directoryNode;
    for (const [normalPath, metadata] of addedOrModifiedFiles) {
      if (addedOrModifiedFiles !== files) {
        files.set(normalPath, metadata);
      }
      const lastSepIdx = normalPath.lastIndexOf(_path.default.sep);
      const dirname = lastSepIdx === -1 ? "" : normalPath.slice(0, lastSepIdx);
      const basename =
        lastSepIdx === -1 ? normalPath : normalPath.slice(lastSepIdx + 1);
      if (directoryNode == null || dirname !== lastDir) {
        const lookup = this._lookupByNormalPath(dirname, {
          followLeaf: false,
          makeDirectories: true,
        });
        if (!(lookup?.node instanceof Map)) {
          throw new Error(
            `TreeFS: Could not add directory ${dirname} when adding files`
          );
        }
        lastDir = dirname;
        directoryNode = lookup.node;
      }
      if (metadata[_constants.default.SYMLINK] !== 0) {
        const symlinkTarget = metadata[_constants.default.SYMLINK];
        (0, _invariant.default)(
          typeof symlinkTarget === "string",
          "expected symlink targets to be populated"
        );
        let rootRelativeSymlinkTarget;
        if (_path.default.isAbsolute(symlinkTarget)) {
          rootRelativeSymlinkTarget = fastPath.relative(
            this.#rootDir,
            symlinkTarget
          );
        } else {
          rootRelativeSymlinkTarget = _path.default.normalize(
            _path.default.join(_path.default.dirname(normalPath), symlinkTarget)
          );
        }
        directoryNode.set(basename, rootRelativeSymlinkTarget);
      } else {
        directoryNode.set(basename, metadata);
      }
    }
  }
  remove(mixedPath) {
    const normalPath = this._normalizePath(mixedPath);
    const result = this._lookupByNormalPath(normalPath, {
      followLeaf: false,
    });
    if (!result || result.node instanceof Map) {
      return null;
    }
    const { parentNode, canonicalPath, node } = result;

    // If node is a symlink, get its metadata from the file map. Otherwise, we
    // already have it in the lookup result.
    const fileMetadata =
      typeof node === "string" ? this.#files.get(canonicalPath) : node;
    if (fileMetadata == null) {
      throw new Error(`TreeFS: Missing metadata for ${mixedPath}`);
    }
    if (parentNode == null) {
      throw new Error(`TreeFS: Missing parent node for ${mixedPath}`);
    }
    this.#files.delete(canonicalPath);
    parentNode.delete(_path.default.basename(canonicalPath));
    return fileMetadata;
  }
  _lookupByNormalPath(
    requestedNormalPath,
    opts = {
      followLeaf: true,
      makeDirectories: false,
    }
  ) {
    // We'll update the target if we hit a symlink.
    let targetNormalPath = requestedNormalPath;
    // Lazy-initialised set of seen target paths, to detect symlink cycles.
    let seen;
    // Pointer to the first character of the current path segment in
    // targetNormalPath.
    let fromIdx = 0;
    // The parent of the current segment
    let parentNode = this.#rootNode;
    while (targetNormalPath.length > fromIdx) {
      const nextSepIdx = targetNormalPath.indexOf(_path.default.sep, fromIdx);
      const isLastSegment = nextSepIdx === -1;
      const segmentName = isLastSegment
        ? targetNormalPath.slice(fromIdx)
        : targetNormalPath.slice(fromIdx, nextSepIdx);
      fromIdx = !isLastSegment ? nextSepIdx + 1 : targetNormalPath.length;
      if (segmentName === ".") {
        continue;
      }
      let segmentNode = parentNode.get(segmentName);
      if (segmentNode == null) {
        if (opts.makeDirectories !== true) {
          return null;
        }
        segmentNode = new Map();
        parentNode.set(segmentName, segmentNode);
      }

      // If there are no more '/' to come, we're done unless this is a symlink
      // we must follow.
      if (
        isLastSegment &&
        (typeof segmentNode !== "string" || opts.followLeaf === false)
      ) {
        return {
          canonicalPath: targetNormalPath,
          node: segmentNode,
          parentNode,
        };
      }

      // If the next node is a directory, go into it
      if (segmentNode instanceof Map) {
        parentNode = segmentNode;
      } else if (Array.isArray(segmentNode)) {
        // Regular file in a directory path
        return null;
      } else if (typeof segmentNode === "string") {
        // segmentNode is a normalised symlink target. Append any subsequent
        // path segments to the symlink target, and reset with our new target.
        targetNormalPath = isLastSegment
          ? segmentNode
          : segmentNode + _path.default.sep + targetNormalPath.slice(fromIdx);
        if (seen == null) {
          // Optimisation: set this lazily only when we've encountered a symlink
          seen = new Set([requestedNormalPath]);
        }
        if (seen.has(targetNormalPath)) {
          // TODO: Warn `Symlink cycle detected: ${[...seen, node].join(' -> ')}`
          return null;
        }
        seen.add(targetNormalPath);
        fromIdx = 0;
        parentNode = this.#rootNode;
      }
    }
    (0, _invariant.default)(
      parentNode === this.#rootNode,
      "Unexpectedly escaped traversal"
    );
    return {
      canonicalPath: targetNormalPath,
      node: this.#rootNode,
      parentNode: null,
    };
  }
  _normalizePath(relativeOrAbsolutePath) {
    return _path.default.isAbsolute(relativeOrAbsolutePath)
      ? fastPath.relative(this.#rootDir, relativeOrAbsolutePath)
      : _path.default.normalize(relativeOrAbsolutePath);
  }
  _normalToAbsolutePath(normalPath) {
    if (normalPath[0] === ".") {
      return _path.default.normalize(
        this.#rootDir + _path.default.sep + normalPath
      );
    } else {
      return this.#rootDir + _path.default.sep + normalPath;
    }
  }
  *_regularFileIterator() {
    for (const [normalPath, metadata] of this.#files) {
      if (metadata[_constants.default.SYMLINK] !== 0) {
        continue;
      }
      yield normalPath;
    }
  }
  *_pathIterator({
    pathSep = _path.default.sep,
    recursive = true,
    rootNode,
    subtreeOnly = false,
  } = {}) {
    for (const [name, node] of rootNode ?? this.#rootNode) {
      if (subtreeOnly && name === "..") {
        continue;
      }
      if (Array.isArray(node)) {
        yield name;
      } else if (typeof node === "string") {
        const resolved = this._lookupByNormalPath(node);
        if (resolved == null) {
          continue;
        }
        const target = resolved.node;
        if (target instanceof Map) {
          if (!recursive) {
            continue;
          }
          // symlink points to a directory - iterate over its contents
          for (const file of this._pathIterator({
            pathSep,
            recursive,
            rootNode: target,
            subtreeOnly,
          })) {
            yield name + pathSep + file;
          }
        } else {
          // symlink points to a file - report it
          yield name;
        }
      } else if (recursive) {
        for (const file of this._pathIterator({
          pathSep,
          recursive,
          rootNode: node,
          subtreeOnly,
        })) {
          yield name + pathSep + file;
        }
      }
    }
  }
  _getFileData(
    filePath,
    opts = {
      followLeaf: true,
    }
  ) {
    const normalPath = this._normalizePath(filePath);
    const metadata = this.#files.get(normalPath);
    if (
      metadata &&
      (!opts.followLeaf || metadata[_constants.default.SYMLINK] === 0)
    ) {
      return metadata;
    }
    const result = this._lookupByNormalPath(normalPath, {
      followLeaf: opts.followLeaf,
    });
    if (!result || result.node instanceof Map) {
      return null;
    }
    return this.#files.get(result.canonicalPath);
  }
}
exports.default = TreeFS;
