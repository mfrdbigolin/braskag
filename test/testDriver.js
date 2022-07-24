/* Test driver: Automatize tests
 * Copyright (C) 2020–2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'
/* eslint-env jest */

/* I consider adding additional methods to a native object, whose names
 * do not conflict with an already existing function to be a good practice
 * on a local scope; because, this removes the necessity of creating a
 * supplementary class.  Therefore, I will disable ESLint in the next line.
 */
// eslint-disable-next-line no-extend-native
Array.prototype.tst = function (fn, name, mocks = []) {
  // Make sure that the initial state is preserved after each test.
  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe(name, () => {
    this.forEach((tstCase, i) => {
      test(`${name}: suite ${i + 1}`, () => {
        mocks.forEach(([spyFn, mockImpl]) => {
          jest.spyOn(...spyFn).mockImplementation(mockImpl)
        })

        if (tstCase[2]) {
          expect(() => fn(...tstCase[0])).toThrow(tstCase[1])
        } else {
          expect(fn(...tstCase[0])).toEqual(tstCase[1])
        }
      })
    })
  })
}
