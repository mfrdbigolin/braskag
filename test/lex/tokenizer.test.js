/* Test cases for tokenizer, lex.js
 * Copyright (C) 2020 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

require("../testDriver");
const lex = require("../../src/lex");

const { tokenizer, Lexeme } = lex;
const { RIGHT, LEFT, PLUS, MINUS, OUTPUT,
        INPUT, LOOP_START, LOOP_END } = lex.Token;

const tokenizerCases = [
  [ [""], [ ], 0 ],
  [ ["noop"], [ ], 0 ],
  [ ["trailá>>> mid <ç~<-- end"], [ 0, 0, 0, 1, 1, 3, 3 ], 0 ],
  [ ["><+-.,[]"], [ 0, 1, 2, 3, 4, 5, 6, 7 ], 0 ],
];

/* Check if the association between lexemes and tokens is correct.  */
const lexemeCases = [
  [ [">"], RIGHT, 0 ],
  [ ["<"], LEFT, 0 ],
  [ ["+"], PLUS, 0 ],
  [ ["-"], MINUS, 0 ],
  [ ["."], OUTPUT, 0 ],
  [ [","], INPUT, 0 ],
  [ ["["], LOOP_START, 0 ],
  [ ["]"], LOOP_END, 0 ],
];

tokenizerCases.tst(tokenizer, "token tokenizer");
lexemeCases.tst(Array.prototype.indexOf.bind(Lexeme),
                "Lexeme associativity test");
