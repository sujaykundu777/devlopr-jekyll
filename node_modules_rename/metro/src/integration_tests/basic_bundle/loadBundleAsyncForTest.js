/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 */

"use strict";

const key = `${global.__METRO_GLOBAL_PREFIX__ ?? ""}__loadBundleAsync`;
global[key] = async function loadBundleAsyncForTest(path) {
  await __DOWNLOAD_AND_EXEC_FOR_TESTS__(path);
};
