/* Test cases for checkBlock, lex.js
 * Copyright (C) 2020–2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

require('../testDriver')
const { tokenizer, checkBlock, BlockState } = require('../../src/lex')
const { OK, UNMATCHED_LEFT, UNMATCHED_RIGHT } = BlockState

const blockCases = [
  [[[]], OK],
  [[tokenizer('+++>>,,69;>.<')], OK],
  [[tokenizer('][')], UNMATCHED_RIGHT],
  [[tokenizer('[]')], OK],
  [[tokenizer('[[]')], UNMATCHED_LEFT],
  [[tokenizer('[]]')], UNMATCHED_RIGHT],
  [[tokenizer('[[]')], UNMATCHED_LEFT],
  [[tokenizer('+[+>-[[-<]<]]>>..,')], OK],
  [[tokenizer(',,[..[+[+]-]-[-[],-[].[,[][+]..,]]')], UNMATCHED_LEFT],
  [[tokenizer('++<<[,>[,<][,<.[>]>]++-].]<[.,,]>')], UNMATCHED_RIGHT]
]

blockCases.tst(checkBlock, 'matches checkBlock')
