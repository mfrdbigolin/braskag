/* Interpreter core
 * Copyright (C) 2020–2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const fs = require('fs')

const { tokenizer } = require('./lex')
const { iterate } = require('./iteration')
const { Options, Behaviors, Directions, Input, program } = require('./options')

program.parse()

function start (sourceCode, inputSource, options) {
  const { DEBUG, CELL_NUM } = options

  const tokens = tokenizer(sourceCode)
  let arrObj = {
    arr: (new Array(!isFinite(CELL_NUM) ? 1 : CELL_NUM)).fill(null),
    ind: 0
  }

  arrObj.arr[0] = 0

  arrObj = iterate(tokens, arrObj, inputSource, options, true)

  if (DEBUG) {
    process.stdout.write('\n')
    console.log(arrObj)
  }
}

function processSourceCode (source, isCode = false) {
  let sourceCode = source

  if (!isCode) {
    sourceCode = fs.readFileSync(source, { encoding: 'utf-8', flag: 'r' })
  }

  return sourceCode
}

function processInputSources (fileSources, contentSources) {
  const files = fileSources ?? []
  const contents = contentSources ?? []

  const inputSources = []

  inputSources.push(...contents)

  for (const file of files) {
    const fileContent = fs.readFileSync(file, { encoding: 'utf-8', flag: 'r' })

    // Remove the remainder newline.
    inputSources.push(fileContent.slice(0, -1))
  }

  let source = inputSources.join('').split('')

  // If only a empty stream was provided, let the source be a newline or null.
  if (source.length === 0) {
    if (files.length > 0) {
      source = ['\n']
    } else if (contents.length > 0) {
      source = ['\0']
    }
  }

  const charList = source.map(c => c.codePointAt(0)).reverse()

  return charList
}

const options = program.opts()

const num = options.cells
const dir = Directions[options.direction.toUpperCase()]
const range = options.range
const over = Behaviors[options.flow.toUpperCase()]
const bound = Behaviors[options.bound.toUpperCase()]
const input = Input[options.input.toUpperCase()]
const debug = options.debug

const InterpreterOptions = new Options({ num, dir, range, over, bound, input, debug })

const source = program.args

const sourceCode = processSourceCode(source[0], options.program)
const inputSource = processInputSources(options.file, options.initialInput)

start(sourceCode, inputSource, InterpreterOptions)
