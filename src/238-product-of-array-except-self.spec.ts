

import { expect } from "chai";
import { productExceptSelf } from "./238-product-of-array-except-self";

describe('238-product-of-array-except-self', () => {

    describe('', () => {
        it('[1,2,3,4]', () => {
            expect(productExceptSelf([1,2,3,4])).to.deep.equal([24,12,8,6])
        });

        it('[-1,1,0,-3,3]', () => {
            expect(productExceptSelf([-1,1,0,-3,3])).to.deep.equal([0,0,9,0,0])
        });
    })
})