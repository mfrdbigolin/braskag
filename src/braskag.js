/* Interpreter core
 * Copyright (C) 2020, 2021 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const fs = require('fs')

const lex = require('./lex')
const options = require('./options')
const iteration = require('./iteration')

const { tokenizer } = lex

const { InterpreterOptions, args } = options
const { CELL_NUM } = InterpreterOptions

const { iterate } = iteration

function start (bfCode) {
  const tokens = tokenizer(bfCode)
  let arrObj = {
    arr: (new Array(!isFinite(CELL_NUM) ? 1 : CELL_NUM))
      .fill(null),
    ind: 0
  }

  arrObj.arr[0] = 0

  arrObj = iterate(tokens, arrObj, true)

  process.stdout.write('\n')
  console.log(arrObj)
}

function parseArgs (args) {
  if (args.substr(0, 3) === 'BF:') {
    start(args.substr(3))
  } else {
    fs.readFile(args, 'utf8', (err, data) => {
      if (err) {
        throw err
      }

      start(data)
    })
  }
}

parseArgs(args[0])
