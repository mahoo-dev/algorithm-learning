import { expect } from "chai";
import {backtracking, inserting} from './46-permutations'

describe('46-permutations', () => {
    describe('Backtracking', () => {
        it('[1,2,3]', () => {
            const nums = [1,2,3]
            const result= backtracking(nums)
            expect(result).to.deep.equal([[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]])
        });
    })

    describe('Inserting', () => {
        it('[1,2,3]', () => {
            const nums = [1,2,3]
            const result= inserting(nums)
            expect(result).to.deep.equal([[3,2,1],[2,3,1],[2,1,3],[3,1,2],[1,3,2],[1,2,3]])
        });
    })
})