/* Test cases for checkBlock, lex.js
 * Copyright (C) 2020, 2021 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

require('../testDriver')
const lex = require('../../src/lex')

const { tokenizer, checkBlock } = lex

const blockCases = [
  [[[]], 0, 0],
  [[tokenizer('+++>>,,69;>.<')], 0, 0],
  [[tokenizer('][')], 2, 0],
  [[tokenizer('[]')], 0, 0],
  [[tokenizer('[[]')], 1, 0],
  [[tokenizer('[]]')], 2, 0],
  [[tokenizer('+[+>-[[-<]<]]>>..,')], 0, 0],
  [[tokenizer(',,[..[+[+]-]-[-[],-[].[,[][+]..,]]')], 1, 0],
  [[tokenizer('++<<[,>[,<][,<.[>]>]++-].]<[.,,]>')], 2, 0]
]

blockCases.tst(checkBlock, 'brackets checkBlock')
