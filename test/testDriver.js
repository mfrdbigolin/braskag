/* Test driver: Automatize tests
 * Copyright (C) 2020 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

Array.prototype.tst = function(fn, name) {
  describe(name, () => {
    this.forEach((tstCase, i) => {
      test(`${name}: suite ${i + 1}`, () => {
        if (tstCase[2]) {
          expect(() => fn(...tstCase[0])).toThrow(tstCase[1]);
        }
        else {
          expect(fn(...tstCase[0])).toEqual(tstCase[1]);
        }
      });
    });
  });
};
