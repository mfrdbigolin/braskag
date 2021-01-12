/* Lexical and syntatic analysis
 * Copyright (C) 2020, 2021 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
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

const Lexeme = ['>', '<', '+', '-', '.', ',', '[', ']']

function tokenizer (bfCode) {
  let tokens = []

  bfCode.split('').forEach((op) => {
    if (Lexeme.includes(op)) {
      tokens = [...tokens, Lexeme.indexOf(op)]
    }
  })

  return tokens
}

/* 0: ok, 1: unmatched left bracket, 2: unmatched right bracket.  */
function checkBlock (tokens) {
  const filtTokens = tokens.filter((tok) => (tok === Token.LOOP_START) ||
                                   (tok === Token.LOOP_END))
  let stat = 0

  filtTokens.some((tok) => {
    stat += (tok === Token.LOOP_START ? 1 : -1)

    return stat < 0
  })

  return !stat ? stat : (stat >= 1 ? 1 : 2)
}

function jumpLabel (tokens) {
  if (checkBlock(tokens) === 1) {
    throw new Error('Unmatched left bracket')
  } else if (checkBlock(tokens) === 2) {
    throw new Error('Unmatched right bracket')
  }

  let labels = []
  let depth = 0

  tokens.forEach((tok, i) => {
    if (tok === Token.LOOP_START) {
      if (++depth === 1) {
        labels = [...labels, [i]]
      }
    }
    if (tok === Token.LOOP_END) {
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
