/* Test cases for iterate, iteration.js
 * Copyright (C) 2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

require('../testDriver')
const { tokenizer } = require('../../src/lex')
const { iterate } = require('../../src/iteration')
const { DefaultOptions } = require('../../src/options')

// Choose a variable n to better gauge the loop invariants.
const n = 5
const initialModel = () => ({ arr: [null, n, null], ind: 1 })

const iterateCases = [
  [[tokenizer('-'), initialModel(), DefaultOptions],
    { arr: [null, 0, null], ind: 1 }],
  [[tokenizer('-'), initialModel(), DefaultOptions, true],
    { arr: [null, n - 1, null], ind: 1 }],
  [[tokenizer('<+>>++<-'), initialModel(), DefaultOptions],
    { arr: [n, 0, 2*n], ind: 1 }],
  [[tokenizer('->[+<]'), initialModel(), DefaultOptions],
    { arr: [null, n - 1, 0], ind: 2 }],
  [[tokenizer('<+[+>]+[<--]'), initialModel(), DefaultOptions],
    { arr: [0, n - 1, 1], ind: 0 }]
]

iterateCases.tst(iterate, 'iterate')
