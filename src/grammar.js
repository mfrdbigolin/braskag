/* Grammatical parsing
 * Copyright (C) 2020 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const lex = require("./lex");
const operations = require("./operations");
const options = require("./options");

const { RIGHT, LEFT, PLUS, MINUS, OUTPUT, INPUT } = lex.Token;
const { OPERATIONS } = operations;
const { InterpreterOptions } = options;

function parseOp(token, { arr, ind }) {
  switch (token) {
  case RIGHT: case LEFT:
    ind = OPERATIONS[token](ind, InterpreterOptions);

    // "Discover" a new square tile.
    if (arr[ind] === null) {
      arr[ind] = 0;
    }
    break;
  case PLUS: case MINUS:
    arr[ind] = OPERATIONS[token](arr[ind], InterpreterOptions);
    break;
  case OUTPUT: case INPUT:
    OPERATIONS[token](arr[ind]);
    break;
  }

  return ({ arr, ind });
}

exports.parseOp = parseOp;
