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

const fs = require("fs");
const path = require("path");
class Package {
  constructor({ file }) {
    this.path = path.resolve(file);
    this._root = path.dirname(this.path);
    this._content = null;
  }
  invalidate() {
    this._content = null;
  }
  read() {
    if (this._content == null) {
      this._content = JSON.parse(fs.readFileSync(this.path, "utf8"));
    }
    return this._content;
  }
}
module.exports = Package;
