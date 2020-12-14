/* Test cases for movRight, operations.js
 * Copyright (C) 2020 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

require("../testDriver.js");
const operations = require("../../src/operations");
const mov = require("./mov");

const boundCases = [
  [ [ 99, mov.suites[0] ], /Upper/, 1 ],
  [ [ 99, mov.suites[1] ], 99, 0 ],
  [ [ 99, mov.suites[2] ], 0, 0 ],
  [ [ 0, mov.suites[3] ], /Upper/, 1 ],
  [ [ 0, mov.suites[4] ], 0, 0 ],
  [ [ 0, mov.suites[5] ], -99, 0 ],
  [ [ 49, mov.suites[6] ], /Upper/, 1 ],
  [ [ 49, mov.suites[7] ], 49, 0 ],
  [ [ 49, mov.suites[8] ], -50, 0 ],
];

const edgeCases = [
  [ [ 98, mov.suites[0] ], 99, 0 ],
  [ [ 98, mov.suites[1] ], 99, 0 ],
  [ [ 98, mov.suites[2] ], 99, 0 ],
  [ [ -1, mov.suites[3] ], 0, 0 ],
  [ [ -1, mov.suites[4] ], 0, 0 ],
  [ [ -1, mov.suites[5] ], 0, 0 ],
  [ [ 48, mov.suites[6] ], 49, 0 ],
  [ [ 48, mov.suites[7] ], 49, 0 ],
  [ [ 48, mov.suites[8] ], 49, 0 ],
];

boundCases.tst(operations.movRight, "bound movRight");
edgeCases.tst(operations.movRight, "edge movRight");
