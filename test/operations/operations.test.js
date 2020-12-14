/* Miscellaneous tests for operations.js
 * Copyright (C) 2020 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

require("../testDriver");
const lex = require("../../src/lex");
const operations = require("../../src/operations");

const { RIGHT, LEFT, PLUS, MINUS, OUTPUT, INPUT } = lex.Token;
const { movRight, movLeft, add, sub,
        output, input, OPERATIONS } = operations;

// Check if the association between tokens and operations is correct.
const operationCases = [
  [ [movRight], RIGHT, 0 ],
  [ [movLeft], LEFT, 0 ],
  [ [add], PLUS, 0 ],
  [ [sub], MINUS, 0 ],
  [ [output], OUTPUT, 0 ],
  [ [input], INPUT, 0 ],
];

operationCases.tst(Array.prototype.indexOf.bind(OPERATIONS),
                   "Operation associativity test");
