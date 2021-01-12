/* Iterator's mechanism
 * Copyright (C) 2020, 2021 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const lex = require('./lex')
const grammar = require('./grammar')

const { jumpLabel } = lex
const { LOOP_START } = lex.Token

const { parseOp } = grammar

/* Nota bene arrObj will be mutated; this function has side effects.  Using
 * the <iterate> function before this one is recommended.
 *   The functional collateral effects are leaved for perfomance's
 * sake; deep cloning the object every call has a huge efficiency
 * drawback.
 *   Another possible issue is that this function uses a recursive
 * process, that may incur in further performance byproducts.
 */
function iterCore (tokens, arrObj, once = false) {
  const jumpSeq = jumpLabel(tokens)

  while (once || arrObj.arr[arrObj.ind] !== 0) {
    let jumpId = 0

    for (let i = 0; i < tokens.length; ++i) {
      if (tokens[i] === LOOP_START) {
        const iterBlock = tokens.slice(jumpSeq[jumpId][0] + 1,
          jumpSeq[jumpId][1])
        arrObj = iterCore(iterBlock, arrObj)

        i = jumpSeq[jumpId++][1] + 1
      }
      arrObj = parseOp(tokens[i], arrObj)
    }

    if (once) {
      once = false
    }
  }

  return arrObj
}

/* The <once> variable is a clever way of reusing the same function for
 * both a simple iteration and for the whole program execution.
 */
function iterate (tokens, arrObj, once = false) {
  // Deep copy arrObj.
  const arrObjCopy = JSON.parse(JSON.stringify(arrObj))

  return iterCore(tokens, arrObjCopy, once)
}

exports.iterate = iterate
