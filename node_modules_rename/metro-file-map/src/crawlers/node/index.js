"use strict";

var _hasNativeFindSupport = _interopRequireDefault(
  require("./hasNativeFindSupport")
);
var _constants = _interopRequireDefault(require("../../constants"));
var fastPath = _interopRequireWildcard(require("../../lib/fast_path"));
var _child_process = require("child_process");
var fs = _interopRequireWildcard(require("graceful-fs"));
var _os = require("os");
var path = _interopRequireWildcard(require("path"));
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
 *
 * @format
 * @oncall react_native
 */

const debug = require("debug")("Metro:NodeCrawler");
function find(roots, extensions, ignore, includeSymlinks, callback) {
  const result = [];
  let activeCalls = 0;
  function search(directory) {
    activeCalls++;
    fs.readdir(
      directory,
      {
        withFileTypes: true,
      },
      (err, entries) => {
        activeCalls--;
        if (err) {
          callback(result);
          return;
        }
        entries.forEach((entry) => {
          const file = path.join(directory, entry.name.toString());
          if (ignore(file)) {
            return;
          }
          if (entry.isSymbolicLink() && !includeSymlinks) {
            return;
          }
          if (entry.isDirectory()) {
            search(file);
            return;
          }
          activeCalls++;
          fs.lstat(file, (err, stat) => {
            activeCalls--;
            if (!err && stat) {
              const ext = path.extname(file).substr(1);
              if (stat.isSymbolicLink() || extensions.includes(ext)) {
                result.push([
                  file,
                  stat.mtime.getTime(),
                  stat.size,
                  stat.isSymbolicLink() ? 1 : 0,
                ]);
              }
            }
            if (activeCalls === 0) {
              callback(result);
            }
          });
        });
        if (activeCalls === 0) {
          callback(result);
        }
      }
    );
  }
  if (roots.length > 0) {
    roots.forEach(search);
  } else {
    callback(result);
  }
}
function findNative(roots, extensions, ignore, includeSymlinks, callback) {
  // Examples:
  // ( ( -type f ( -iname *.js ) ) )
  // ( ( -type f ( -iname *.js -o -iname *.ts ) ) )
  // ( ( -type f ( -iname *.js ) ) -o -type l )
  // ( ( -type f ) -o -type l )
  const extensionClause = extensions.length
    ? `( ${extensions.map((ext) => `-iname *.${ext}`).join(" -o ")} )`
    : ""; // Empty inner expressions eg "( )" are not allowed
  const expression = `( ( -type f ${extensionClause} ) ${
    includeSymlinks ? "-o -type l " : ""
  })`;
  const child = (0, _child_process.spawn)(
    "find",
    roots.concat(expression.split(" "))
  );
  let stdout = "";
  if (child.stdout == null) {
    throw new Error(
      "stdout is null - this should never happen. Please open up an issue at https://github.com/facebook/metro"
    );
  }
  child.stdout.setEncoding("utf-8");
  child.stdout.on("data", (data) => (stdout += data));
  child.stdout.on("close", () => {
    const lines = stdout
      .trim()
      .split("\n")
      .filter((x) => !ignore(x));
    const result = [];
    let count = lines.length;
    if (!count) {
      callback([]);
    } else {
      lines.forEach((path) => {
        fs.lstat(path, (err, stat) => {
          if (!err && stat) {
            result.push([
              path,
              stat.mtime.getTime(),
              stat.size,
              stat.isSymbolicLink() ? 1 : 0,
            ]);
          }
          if (--count === 0) {
            callback(result);
          }
        });
      });
    }
  });
}
module.exports = async function nodeCrawl(options) {
  const {
    previousState,
    extensions,
    forceNodeFilesystemAPI,
    ignore,
    rootDir,
    includeSymlinks,
    perfLogger,
    roots,
    abortSignal,
  } = options;
  abortSignal?.throwIfAborted();
  perfLogger?.point("nodeCrawl_start");
  const useNativeFind =
    !forceNodeFilesystemAPI &&
    (0, _os.platform)() !== "win32" &&
    (await (0, _hasNativeFindSupport.default)());
  debug("Using system find: %s", useNativeFind);
  return new Promise((resolve, reject) => {
    const callback = (list) => {
      const changedFiles = new Map();
      const removedFiles = new Map(previousState.files);
      for (const fileData of list) {
        const [filePath, mtime, size, symlink] = fileData;
        const relativeFilePath = fastPath.relative(rootDir, filePath);
        const existingFile = previousState.files.get(relativeFilePath);
        removedFiles.delete(relativeFilePath);
        if (
          existingFile == null ||
          existingFile[_constants.default.MTIME] !== mtime
        ) {
          // See ../constants.js; SHA-1 will always be null and fulfilled later.
          changedFiles.set(relativeFilePath, [
            "",
            mtime,
            size,
            0,
            "",
            null,
            symlink,
          ]);
        }
      }
      perfLogger?.point("nodeCrawl_end");
      try {
        // TODO: Use AbortSignal.reason directly when Flow supports it
        abortSignal?.throwIfAborted();
      } catch (e) {
        reject(e);
      }
      resolve({
        changedFiles,
        removedFiles,
      });
    };
    if (useNativeFind) {
      findNative(roots, extensions, ignore, includeSymlinks, callback);
    } else {
      find(roots, extensions, ignore, includeSymlinks, callback);
    }
  });
};
