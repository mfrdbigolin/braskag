/* Grammatical parsing
 * Copyright (C) 2020–2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const { Token } = require('./lex')
const { OPERATIONS } = require('./operations')

const { RIGHT, LEFT, PLUS, MINUS, OUTPUT, INPUT } = Token

function parseOp (token, { arr, ind }, inputSource, options) {
  switch (token) {
    case RIGHT: case LEFT:
      ind = OPERATIONS[token](ind, options)

      // "Discover" a new square tile.
      if (arr[ind] === null) {
        arr[ind] = 0
      }
      break
    case PLUS: case MINUS:
      arr[ind] = OPERATIONS[token](arr[ind], options)
      break
    case OUTPUT:
      OPERATIONS[token](arr[ind])
      break
    case INPUT:
      arr[ind] = OPERATIONS[token](inputSource, options)
      break
    default:
      throw new Error('Unknown operation')
  }

  return ({ arr, ind })
}

exports.parseOp = parseOp
