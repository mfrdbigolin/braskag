/* Test cases for tokenizer, lex.js
 * Copyright (C) 2020–2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

require('../testDriver')
const { tokenizer, Lexeme, Token } = require('../../src/lex')

const {
  RIGHT, LEFT, PLUS, MINUS, OUTPUT, INPUT, LOOP_START, LOOP_END
} = Token

/* Check if the association between lexemes and tokens is correct.  */
const lexemeCases = [
  [['>'], RIGHT],
  [['<'], LEFT],
  [['+'], PLUS],
  [['-'], MINUS],
  [['.'], OUTPUT],
  [[','], INPUT],
  [['['], LOOP_START],
  [[']'], LOOP_END]
]

const tokenizerCases = [
  [[''], []],
  [['noop\0'], []],
  [
    ['trai:láß>>\n> mid <ç~<\t--Wǒ end'],
    [RIGHT, RIGHT, RIGHT, LEFT, LEFT, MINUS, MINUS]
  ],
  [
    ['><+-.,[]'],
    [RIGHT, LEFT, PLUS, MINUS, OUTPUT, INPUT, LOOP_START, LOOP_END]
  ],
  [
    ['<[+,.-]>'],
    [LEFT, LOOP_START, PLUS, INPUT, OUTPUT, MINUS, LOOP_END, RIGHT]
  ]
]

lexemeCases.tst(Array.prototype.indexOf.bind(Lexeme),
  'Lexeme associativity test')
tokenizerCases.tst(tokenizer, 'tokens tokenizer')
