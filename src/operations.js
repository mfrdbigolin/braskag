/* Language operations
 * Copyright (C) 2020–2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const { Directions, Behaviors, Input } = require('./options')
const readline = require('readline-sync')

const OPERATIONS = [movRight, movLeft, add, sub, output, input]

const { RIGHT, LEFT, CENTER } = Directions
const { ERROR, WRAP } = Behaviors
const { CYCLIC, PROCEDURAL, PREEMPTIVE } = Input

function cellUpper ({ CELL_NUM, CELL_DIRECTION }) {
  switch (CELL_DIRECTION) {
    case RIGHT:
      return CELL_NUM - 1
    case LEFT:
      return 0
    case CENTER:
      return Math.floor(CELL_NUM / 2)
    default:
      throw new Error('Unknown cell direction')
  }
}

function cellLower ({ CELL_NUM, CELL_DIRECTION }) {
  switch (CELL_DIRECTION) {
    case RIGHT:
      return 0
    case LEFT:
      return -CELL_NUM + 1
    case CENTER:
      return -Math.floor((CELL_NUM - 1) / 2)
    default:
      throw new Error('Unknown cell direction')
  }
}

function movRight (pointer, { CELL_NUM, CELL_DIRECTION, BOUND_BEHAVIOR }) {
  if ((pointer + 1) > cellUpper({ CELL_NUM, CELL_DIRECTION })) {
    switch (BOUND_BEHAVIOR) {
      case ERROR:
        throw new Error('Upper Bound Violation')
      case WRAP:
        return cellLower({ CELL_NUM, CELL_DIRECTION })
    }
  } else {
    pointer += 1
  }

  return pointer
}

function movLeft (pointer, { CELL_NUM, CELL_DIRECTION, BOUND_BEHAVIOR }) {
  if ((pointer - 1) < cellLower({ CELL_NUM, CELL_DIRECTION })) {
    switch (BOUND_BEHAVIOR) {
      case ERROR:
        throw new Error('Lower Bound Violation')
      case WRAP:
        return cellUpper({ CELL_NUM, CELL_DIRECTION })
    }
  } else {
    pointer -= 1
  }

  return pointer
}

function add (cell, { CELL_RANGE, OVERFLOW_BEHAVIOR }) {
  if ((cell + 1) >= CELL_RANGE) {
    switch (OVERFLOW_BEHAVIOR) {
      case ERROR:
        throw new Error('Overflow')
      case WRAP:
        return 0
    }
  } else {
    cell += 1
  }

  return cell
}

function sub (cell, { CELL_RANGE, OVERFLOW_BEHAVIOR }) {
  if (cell < 1) {
    switch (OVERFLOW_BEHAVIOR) {
      case ERROR:
        throw new Error('Underflow')
      case WRAP:
        return CELL_RANGE - 1
    }
  } else {
    cell -= 1
  }

  return cell
}

// Return the printed character for testing purposes.
function output (cell) {
  const character = String.fromCharCode(cell)

  process.stdout.write(character)

  return character
}

let buffer = []

/* This function is not pure, considering that it uses the `buffer` global
 * variable, therefore it carries functional collateral effects.  The function
 * `inputCore`, below, reads the input from a stream, whether its the stdin or a
 * file, and does not use global variables.
 */
function input (inputSource, { INPUT_BEHAVIOR }) {
  let source = buffer

  if (buffer.length === 0) {
    source = inputCore(INPUT_BEHAVIOR, inputSource)
  }

  switch (INPUT_BEHAVIOR) {
    case CYCLIC: case PREEMPTIVE:
      buffer = source

      return buffer.pop()
    case PROCEDURAL:
      return source.pop()
  }
}

function inputCore (behavior, inputSource) {
  if (inputSource.length > 0) {
    return behavior === CYCLIC ? inputSource : [inputSource.pop()]
  }

  // ANSI: Save the cursor position before the prompt.
  readline.setDefaultOptions({ prompt: '\x1B[s\n> ', keepWhitespace: true })
  const stream = readline.prompt() || '\n'

  // Clear input prompt.
  // ANSI: Move to previous line.
  process.stdout.write('\x1B[1A')
  // ANSI: Wipe out the entire line.
  process.stdout.write('\x1B[2K')
  // ANSI: Restore the cursor position.
  process.stdout.write('\x1B[u\x1B[C\b')

  const source = stream.split('').map(c => c.codePointAt(0)).reverse()

  return source
}

// Individual operations, for testing purposes.
exports.movRight = movRight
exports.movLeft = movLeft
exports.add = add
exports.sub = sub
exports.output = output
exports.input = input

exports.cellUpper = cellUpper
exports.cellLower = cellLower

exports.OPERATIONS = OPERATIONS
