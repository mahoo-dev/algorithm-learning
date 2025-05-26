import { expect } from "chai";
import { swappingToCorrectIndex, markingByNegation } from "./41-first-missing-positive";

describe('41-first-missing-positive', () => {

    describe('swapping to correct index', () => {
        it('[1]', () => {
            const nums = [1]
            const ans = swappingToCorrectIndex(nums)
            expect(ans).to.deep.equal(2)
        });

        it('[3,4,-1,1]', () => {
            const nums = [3,4,-1,1]
            const ans = swappingToCorrectIndex(nums)
            expect(ans).to.deep.equal(2)
        });

        it('[7,8,9,11,12]', () => {
            const nums = [7,8,9,11,12]
            const ans = swappingToCorrectIndex(nums)
            expect(ans).to.deep.equal(1)
        });
    })

    describe('marking by negation', () => {
        it('[1]', () => {
            const nums = [1]
            const ans = markingByNegation(nums)
            expect(ans).to.deep.equal(2)
        });
        it('[3,4,-1,1]', () => {
            const nums = [3,4,-1,1]
            const ans = markingByNegation(nums)
            expect(ans).to.deep.equal(2)
        });

        it('[7,8,9,11,12]', () => {
            const nums = [7,8,9,11,12]
            const ans = markingByNegation(nums)
            expect(ans).to.deep.equal(1)
        });
    })
})