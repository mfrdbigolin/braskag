/* Test cases for the move functions, operations.js; range testing
 * Copyright (C) 2020 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

require("../testDriver.js");
const operations = require("../../src/operations");
const mov = require("./mov");

const upperCases = [
  [ [mov.suites[0]], 99, 0 ],
  [ [mov.suites[3]], 0, 0 ],
  [ [mov.suites[6]], 49, 0 ],
];

const lowerCases = [
  [ [mov.suites[0]], 0, 0 ],
  [ [mov.suites[3]], -99, 0 ],
  [ [mov.suites[6]], -50, 0 ],
];

upperCases.tst(operations.cellUpper, "cellUpper");
lowerCases.tst(operations.cellLower, "cellLower");
