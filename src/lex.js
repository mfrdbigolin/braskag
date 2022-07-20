/* Lexical and syntatic analysis
 * Copyright (C) 2020–2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const Token = Object.freeze({
  RIGHT: 0,
  LEFT: 1,
  PLUS: 2,
  MINUS: 3,
  OUTPUT: 4,
  INPUT: 5,
  LOOP_START: 6,
  LOOP_END: 7
})

const Lexeme = Object.freeze(['>', '<', '+', '-', '.', ',', '[', ']'])
const { LOOP_START, LOOP_END } = Token

function tokenizer (bfCode) {
  const tokens = []

  bfCode.split('').forEach((op) => {
    if (Lexeme.includes(op)) {
      tokens.push(Lexeme.indexOf(op))
    }
  })

  return tokens
}

const BlockState = Object.freeze({
  OK: 0,
  UNMATCHED_LEFT: 1,
  UNMATCHED_RIGHT: 2
})

const { OK, UNMATCHED_LEFT, UNMATCHED_RIGHT } = BlockState

function checkBlock (tokens) {
  const filtTokens = tokens.filter((tok) => (tok === LOOP_START) ||
                                            (tok === LOOP_END))
  let stat = OK

  filtTokens.some((tok) => {
    stat += (tok === LOOP_START ? 1 : -1)

    return stat < 0
  })

  return !stat ? OK : (stat >= 1 ? UNMATCHED_LEFT : UNMATCHED_RIGHT)
}

function jumpLabel (tokens) {
  const blockCheck = checkBlock(tokens)

  if (blockCheck === UNMATCHED_LEFT) {
    throw new Error('Unmatched left bracket')
  } else if (blockCheck === UNMATCHED_RIGHT) {
    throw new Error('Unmatched right bracket')
  }

  const labels = []
  let depth = 0

  tokens.forEach((tok, i) => {
    if (tok === LOOP_START) {
      if (++depth === 1) {
        labels.push([i])
      }
    }
    if (tok === LOOP_END) {
      if (--depth === 0) {
        labels[labels.length - 1][1] = i
      }
    }
  })

  return labels
}

exports.tokenizer = tokenizer
exports.Lexeme = Lexeme
exports.checkBlock = checkBlock
exports.jumpLabel = jumpLabel
exports.Token = Token
exports.BlockState = BlockState
