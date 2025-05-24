import { expect } from "chai";
import { rotate } from "./189-rotate-array";

describe('189-rotate-array', () => {

    describe('cyclic replacements', () => {
        it('[1,2,3,4,5,6,7], k = 3', () => {
            const nums = [1,2,3,4,5,6,7]
            rotate(nums, 3)
            expect(nums).to.deep.equal([5,6,7,1,2,3,4])
        });

        it('[1,2,3,4,5,6], k = 2', () => {
            const nums = [1,2,3,4,5,6]
            rotate(nums, 2)
            expect(nums).to.deep.equal([5,6,1,2,3,4])
        });
    })
})