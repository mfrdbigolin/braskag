/* Interpreter options
 * Copyright (C) 2020–2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const { Command, Option } = require('commander')

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

    if (isNaN(num)) {
      throw new Error('Invalid number of cells.  Please input a number greater than two or the value “infinite”.')
    } else if (isNaN(range)) {
      throw new Error('Invalid cell range value.  Please input a number greater than two or the value “infinite”.')
    }

    if (num === Infinity && bound === Behaviors.WRAP) {
      throw new Error('A bound behavior of “wrap” is not acceptable with an infinite number of cells.')
    }

    if (range === Infinity && over === Behaviors.WRAP) {
      throw new Error('An underflow behavior of “wrap” is not acceptable with an infinite range.')
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

const program = new Command()

const parseInteger = (numStr, _) => (
  numStr.toLowerCase() === 'infinite' ? Infinity : parseInt(numStr, 10)
)

program
  .name('braskag')
  .description('Brainfuck interpreter')
  .argument('<source>', 'Brainfuck source code')
  .version('1.0')

  .option('-d, --debug', 'print the program tape at the end')
  .option('-p, --program', 'interpret <source> as Brainfuck code')

  .option('-c, --cells <number>|infinite', 'number of cells in the tape',
    parseInteger, 30000)
  .option('-r, --range <number>|infinite', 'numeric cell range', parseInteger, 128)

  .option('-f, --file <files...>', 'input files to be read')
  .option('-i, --initial-input <inputs...>', 'initial inputs read by the program')

  .addOption(new Option('-D, --direction <way>', 'tape orientation')
    .choices(['right', 'left', 'center']).default('right'))
  .addOption(new Option('-F, --flow <behavior>', 'out-of-range cell value')
    .choices(['error', 'unchanged', 'wrap']).default('error'))
  .addOption(new Option('-B, --bound <behavior>', 'out-of-bound cell behavior')
    .choices(['error', 'unchanged', 'wrap']).default('error'))
  .addOption(new Option('-I, --input <behavior>', 'input behavior')
    .choices(['procedural', 'preemptive', 'cyclic']).default('procedural'))

exports.Behaviors = Behaviors
exports.Directions = Directions
exports.Input = Input
exports.Options = Options
exports.DefaultOptions = DefaultOptions
exports.program = program
