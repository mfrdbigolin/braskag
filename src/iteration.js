/* Iterator's mechanism
 * Copyright (C) 2020–2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
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
function iterCore (tokens, arrObj, inputSource, options, once = false) {
  const jumpSeq = jumpLabel(tokens)

  // Really unnecessary ESLint warning.
  // eslint-disable-next-line no-unmodified-loop-condition
  while (once || arrObj.arr[arrObj.ind] !== 0) {
    let jumpId = 0

    for (let i = 0; i < tokens.length; ++i) {
      if (tokens[i] === LOOP_START) {
        const iterBlock = tokens.slice(jumpSeq[jumpId][0] + 1,
          jumpSeq[jumpId][1])
        arrObj = iterCore(iterBlock, arrObj, inputSource, options)

        i = jumpSeq[jumpId++][1]
      } else {
        arrObj = parseOp(tokens[i], arrObj, inputSource, options)
      }
    }

    if (once) {
      break
    }
  }

  return arrObj
}

/* The <once> variable is a clever way of reusing the same function for
 * both a simple iteration and for the whole program execution.
 */
function iterate (tokens, arrObj, inputSource, options, once = false) {
  // Deep copy arrObj and inputSources.
  const arrObjCopy = JSON.parse(JSON.stringify(arrObj))
  const inputSourcesCopy = JSON.parse(JSON.stringify(inputSource))

  return iterCore(tokens, arrObjCopy, inputSourcesCopy, options, once)
}

exports.iterate = iterate
