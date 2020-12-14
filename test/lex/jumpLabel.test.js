/* Test cases for jumpLabel, lex.js
 * Copyright (C) 2020 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

require("../testDriver");
const lex = require("../../src/lex");

const { tokenizer, jumpLabel } = lex;

const labelCases = [
  [ [[ ]], [ ], 0 ],
  [ [tokenizer("][")], /right/, 1 ],
  [ [tokenizer("[[]")], /left/, 1 ],
  [ [tokenizer("[][]")], [ [ 0, 1 ], [ 2, 3 ] ], 0 ],
  [ [tokenizer("[[]][]")], [ [ 0, 3 ], [ 4, 5 ] ], 0 ],
];

labelCases.tst(jumpLabel, "labels jumpLabels");
