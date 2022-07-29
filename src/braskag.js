/* Interpreter core
 * Copyright (C) 2020–2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const fs = require('fs')

const { tokenizer } = require('./lex')
const { iterate } = require('./iteration')
const { Command, Option } = require('commander')
const { Options, Behaviors, Directions, Input } = require('./options')

const program = new Command()

const parseInteger = (numStr, _) => parseInt(numStr, 10)

program
  .name('braskag')
  .description('Brainfuck interpreter')
  .argument('<source>', 'Brainfuck source code')
  .version('1.0', '--version')

  .option('-d, --debug', 'print the program tape at the end')
  .option('-c, --cells <int>', 'number of cells in the tape',
    parseInteger, 30000)
  .option('-r, --range <int>', 'numeric cell range', parseInteger, 128)
  .option('-f, --file <files...>', 'input file to be read')
  .addOption(new Option('-D, --direction <way>', 'tape orientation')
    .choices(['right', 'left', 'center']).default('right'))
  .addOption(new Option('-F, --flow <behavior>', 'out-of-range cell value')
    .choices(['error', 'unchanged', 'wrap']).default('error'))
  .addOption(new Option('-B, --bound <behavior>', 'out-of-bound cell behavior')
    .choices(['error', 'unchanged', 'wrap']).default('error'))
  .addOption(new Option('-I, --input <behavior>', 'input behavior')
    .choices(['procedural', 'preemptive', 'file']).default('procedural'))
  .option('-p, --program', 'interpret <source> as Brainfuck code')

program.parse()

function start (bfCode, options, debug = false) {
  const { CELL_NUM } = options

  const tokens = tokenizer(bfCode)
  let arrObj = {
    arr: (new Array(!isFinite(CELL_NUM) ? 1 : CELL_NUM))
      .fill(null),
    ind: 0
  }

  arrObj.arr[0] = 0

  arrObj = iterate(tokens, arrObj, options, true)

  if (debug) {
    process.stdout.write('\n')
    console.log(arrObj)
  }
}

function parseArgs (source, options, { isCode = false, debug = false }) {
  let sourceCode = source

  if (!isCode) {
    sourceCode = fs.readFileSync(source, { encoding: 'utf-8', flag: 'r' })
  }

  start(sourceCode, options, debug)
}

const options = program.opts()

const num = options.cells
const dir = Directions[options.direction.toUpperCase()]
const range = options.range
const over = Behaviors[options.flow.toUpperCase()]
const bound = Behaviors[options.bound.toUpperCase()]
const input = Input[options.input.toUpperCase()]

const InterpreterOptions = new Options({ num, dir, range, over, bound, input })

const source = program.args

const debug = options.debug
const isCode = options.program

parseArgs(source[0], InterpreterOptions, { isCode, debug })
