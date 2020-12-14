/* Test cases for movLeft, operations.js
 * Copyright (C) 2020 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

require("../testDriver.js");
const operations = require("../../src/operations");
const mov = require("./mov");

const boundCases = [
  [ [ 0, mov.suites[0] ], /Lower/, 1 ],
  [ [ 0, mov.suites[1] ], 0, 0 ],
  [ [ 0, mov.suites[2] ], 99, 0 ],
  [ [ -99, mov.suites[3] ], /Lower/, 1 ],
  [ [ -99, mov.suites[4] ], -99, 0 ],
  [ [ -99, mov.suites[5] ], 0, 0 ],
  [ [ -50, mov.suites[6] ], /Lower/, 1 ],
  [ [ -50, mov.suites[7] ], -50, 0 ],
  [ [ -50, mov.suites[8] ], 49, 0 ],
];

const edgeCases = [
  [ [ 1, mov.suites[0] ], 0, 0 ],
  [ [ 1, mov.suites[1] ], 0, 0 ],
  [ [ 1, mov.suites[2] ], 0, 0 ],
  [ [ -98, mov.suites[3] ], -99, 0 ],
  [ [ -98, mov.suites[4] ], -99, 0 ],
  [ [ -98, mov.suites[5] ], -99, 0 ],
  [ [ -49, mov.suites[6] ], -50, 0 ],
  [ [ -49, mov.suites[7] ], -50, 0 ],
  [ [ -49, mov.suites[8] ], -50, 0 ],
];

boundCases.tst(operations.movLeft, "bound movLeft");
edgeCases.tst(operations.movLeft, "edge movLeft");
