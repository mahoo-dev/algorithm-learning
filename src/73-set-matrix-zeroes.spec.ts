import { expect } from "chai";
import {arrayMarking, markingInPlace } from "./73-set-matrix-zeroes";

describe('73-set-matrix-zeroes', () => {

    describe('Array Marking', () => {
        it('[[1,1,1],[1,0,1],[1,1,1]]', () => {
            const nums = [[1,1,1],[1,0,1],[1,1,1]]
            arrayMarking(nums)
            expect(nums).to.deep.equal([[1,0,1],[0,0,0],[1,0,1]])
        });

        it('[[0,1,2,0],[3,4,5,2],[1,3,1,5]]', () => {
            const nums = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
            arrayMarking(nums)
            expect(nums).to.deep.equal([[0,0,0,0],[0,4,5,0],[0,3,1,0]])
        });
    })

    describe('Marking in place', () => {
        it('[[1,1,1],[1,0,1],[1,1,1]]', () => {
            const nums = [[1,1,1],[1,0,1],[1,1,1]]
            markingInPlace(nums)
            expect(nums).to.deep.equal([[1,0,1],[0,0,0],[1,0,1]])
        });

        it('[[0,1,2,0],[3,4,5,2],[1,3,1,5]]', () => {
            const nums = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
            markingInPlace(nums)
            expect(nums).to.deep.equal([[0,0,0,0],[0,4,5,0],[0,3,1,0]])
        });
    })
})