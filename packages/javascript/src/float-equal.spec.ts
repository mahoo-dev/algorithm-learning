// 基础测试
import { expect } from "chai";
import { floatEqual } from "./float-equal";



describe('floatEqual 测试套件', () => {
    // 基础测试
    it('基础浮点数相等测试', () => {
        expect(floatEqual(0.1 + 0.2, 0.3)).to.be.true;
    });

    // 不同量级测试
    it('不同量级浮点数比较测试', () => {
        expect(floatEqual(1e-16, 1e-16 + 1e-32)).to.be.true; // 极小值范围内视为相等
        expect(floatEqual(1e30, 1e30 + 1e14)).to.be.true; // 大数但差异未超过当前ULP
        expect(floatEqual(1e30, 1e30 + 1e15)).to.be.false; // 差异超过ULP，应不等
        expect(floatEqual(2.5, 2.500000000000001)).to.be.false; // 小数轻微误差
        expect(floatEqual(2.5, 2.5000000000001)).to.be.false; // 超出合理误差范围
        expect(floatEqual(3.0, 3.0 + 4e-16)).to.be.true; // ULP=4.44e-16
        expect(floatEqual(0.75, 0.75 + 1e-16)).to.be.true; // ULP=1.11e-16
    });

    // 边界测试
    it('边界值测试', () => {
        expect(floatEqual(Number.MIN_VALUE, Number.MIN_VALUE)).to.be.true;
        expect(floatEqual(Infinity, Infinity)).to.be.true;
        expect(floatEqual(NaN, NaN)).to.be.false; // 符合 JavaScript 标准
        expect(floatEqual(+0, -0)).to.be.true;
    });

    // 实际应用测试
    it('实际应用中的浮点数比较测试', () => {
        expect(floatEqual(Math.PI, 3.141592653589793)).to.be.true;
        expect(floatEqual(Math.sqrt(2), 1.4142135623730951)).to.be.true;
    });
});
