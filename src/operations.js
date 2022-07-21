/* Language operations
 * Copyright (C) 2020–2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const { Directions, Behaviors } = require('./options')

const OPERATIONS = [movRight, movLeft, add, sub, output, input]

const { RIGHT, LEFT, BOTH } = Directions
const { ERROR, WRAP } = Behaviors

function cellUpper ({ CELL_NUM, CELL_DIRECTION }) {
  switch (CELL_DIRECTION) {
    case RIGHT:
      return CELL_NUM - 1
    case LEFT:
      return 0
    case BOTH:
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
    case BOTH:
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
    if (OVERFLOW_BEHAVIOR === ERROR) {
      throw new Error('Overflow')
    } else if (OVERFLOW_BEHAVIOR === WRAP) {
      return 0
    }
  } else {
    cell += 1
  }

  return cell
}

function sub (cell, { CELL_RANGE, OVERFLOW_BEHAVIOR }) {
  if (cell < 1) {
    if (OVERFLOW_BEHAVIOR === ERROR) {
      throw new Error('Underflow')
    } else if (OVERFLOW_BEHAVIOR === WRAP) {
      return CELL_RANGE - 1
    }
  } else {
    cell -= 1
  }

  return cell
}

function output (cell) {
  process.stdout.write(String.fromCharCode(cell))
}

// TODO
function input (cell) {
  process.stdout.write('í')
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
