/* Test cases for jumpLabel, lex.js
 * Copyright (C) 2020–2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

require('../testDriver')
const { tokenizer, jumpLabel } = require('../../src/lex')

const labelCases = [
  [[[]], []],
  [[tokenizer('][')], /right/, true],
  [[tokenizer('[[]]]')], /right/, true],
  [[tokenizer('[[]')], /left/, true],
  [[tokenizer('[[][')], /left/, true],
  [[tokenizer('[][]')], [[0, 1], [2, 3]]],
  [[tokenizer('[[]][]')], [[0, 3], [4, 5]]]
]

labelCases.tst(jumpLabel, 'labels jumpLabels')
