/* Test driver: Automatize tests
 * Copyright (C) 2020, 2021 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'
/* eslint-env jest */

/* I consider adding additional functions to a native object, which names
 * do not conflict with an already existing function to be a good practice
 * on a local scope; because this removes the necessity of creating a
 * supplementary class.  Therefore, I will disable eslint in the next line.
 */
// eslint-disable-next-line no-extend-native
Array.prototype.tst = function (fn, name) {
  describe(name, () => {
    this.forEach((tstCase, i) => {
      test(`${name}: suite ${i + 1}`, () => {
        if (tstCase[2]) {
          expect(() => fn(...tstCase[0])).toThrow(tstCase[1])
        } else {
          expect(fn(...tstCase[0])).toEqual(tstCase[1])
        }
      })
    })
  })
}
