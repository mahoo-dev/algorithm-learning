import { expect } from 'chai';
import { PreciseMath } from './big-number';

describe('PreciseMath 精确计算测试', () => {
    const math = new PreciseMath();

    it('基础浮点数精确计算', () => {
        expect(math.add('0.1', '0.2')).to.equal('0.3');
        expect(math.equals('0.1', math.subtract('0.3', '0.2'))).to.be.true;
    });

    it('大数运算测试', () => {
        expect(math.add('10000000000000000', '1')).to.equal('10000000000000001');
        expect(math.equals('10000000000000000', '10000000000000001')).to.be.false;
    });

    it('科学计数法小数加法测试', () => {
        expect(math.add('0.0000000001', '0.0000000001')).to.equal('0.0000000002');
    });

    it('与原生浮点数对比测试', () => {
        // 原生浮点数误差测试（仅供输出参考）
        // 注意：原生浮点数无法用 equal 精确比较，只能做近似判断
        expect(0.1 + 0.2).not.to.equal(0.3);
        expect(math.add('0.1', '0.2')).to.equal('0.3');
    });
});
