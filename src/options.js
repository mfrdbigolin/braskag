/* Interpreter options
 * Copyright (C) 2020–2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

class Options {
  constructor ({
    num = DefaultOptions.CELL_NUM,
    dir = DefaultOptions.CELL_DIRECTION,
    range = DefaultOptions.CELL_RANGE,
    over = DefaultOptions.OVERFLOW_BEHAVIOR,
    bound = DefaultOptions.BOUND_BEHAVIOR,
    input = DefaultOptions.INPUT_BEHAVIOR,
    debug = DefaultOptions.DEBUG
  } = DefaultOptions) {
    if (num < 2) {
      throw new Error('The number of cells must be at least 2.')
    } else if (range < 2) {
      throw new Error('The range of a cell must be at least 2.')
    }

    this.CELL_NUM = num
    this.CELL_DIRECTION = dir
    this.CELL_RANGE = range
    this.OVERFLOW_BEHAVIOR = over
    this.BOUND_BEHAVIOR = bound
    this.INPUT_BEHAVIOR = input
    this.DEBUG = debug
  }
}

const Behaviors = Object.freeze({
  ERROR: Symbol('ERROR'),
  UNCHANGED: Symbol('UNCHANGED'),
  WRAP: Symbol('WRAP')
})

const Directions = Object.freeze({
  RIGHT: Symbol('RIGHT'),
  LEFT: Symbol('LEFT'),
  CENTER: Symbol('CENTER')
})

const Input = Object.freeze({
  PROCEDURAL: Symbol('PROCEDURAL'),
  PREEMPTIVE: Symbol('PREEMPTIVE'),
  CYCLIC: Symbol('CYCLIC')
})

const StrictOptions = ({
  CELL_NUM: 30000,
  CELL_DIRECTION: Directions.RIGHT,
  CELL_RANGE: 128,
  OVERFLOW_BEHAVIOR: Behaviors.ERROR,
  BOUND_BEHAVIOR: Behaviors.ERROR,
  INPUT_BEHAVIOR: Input.PROCEDURAL,
  DEBUG: false
})

const DefaultOptions = StrictOptions

exports.Behaviors = Behaviors
exports.Directions = Directions
exports.Input = Input
exports.Options = Options
exports.DefaultOptions = DefaultOptions
