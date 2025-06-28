/**
 * 最小可用精确计算库
 * 基于字符串处理和整数运算原理
 */
export class PreciseMath {
    private precision: number;
    private roundingMode: string;
    constructor(precision = 20) {
        this.precision = precision;
        this.roundingMode = 'round'; // round, floor, ceil
    }

    /**
     * 将数字转换为字符串，处理科学计数法
     */
    _normalize(num) {
        if (typeof num === 'string') return num;

        // 处理科学计数法
        const str = num.toString();
        if (str.includes('e') || str.includes('E')) {
            const [mantissa, exponent] = str.split(/[eE]/);
            const exp = parseInt(exponent);

            if (exp > 0) {
                return mantissa.replace('.', '') + '0'.repeat(exp - (mantissa.length - mantissa.indexOf('.') - 1));
            } else {
                return '0.' + '0'.repeat(-exp - 1) + mantissa.replace('.', '');
            }
        }

        return str;
    }

    /**
     * 将小数转换为整数进行运算
     * 例如：0.1 + 0.2 => (1 * 10^1 + 2 * 10^1) / 10^1
     */
    _toInteger(num) {
        const str = this._normalize(num);
        const parts = str.split('.');

        if (parts.length === 1) {
            return {
                value: parts[0],
                scale: 0
            };
        }

        return {
            value: parts[0] + parts[1],
            scale: parts[1].length
        };
    }

    /**
     * 对齐两个数的精度
     */
    _align(a, b) {
        const maxScale = Math.max(a.scale, b.scale);

        return {
            a: {
                value: a.value + '0'.repeat(maxScale - a.scale),
                scale: maxScale
            },
            b: {
                value: b.value + '0'.repeat(maxScale - b.scale),
                scale: maxScale
            }
        };
    }

    /**
     * 字符串加法
     */
    _addStrings(a, b) {
        const maxLen = Math.max(a.length, b.length);
        a = a.padStart(maxLen, '0');
        b = b.padStart(maxLen, '0');

        let carry = 0;
        let result = '';

        for (let i = maxLen - 1; i >= 0; i--) {
            const sum = parseInt(a[i]) + parseInt(b[i]) + carry;
            result = (sum % 10) + result;
            carry = Math.floor(sum / 10);
        }

        if (carry > 0) {
            result = carry + result;
        }

        return result;
    }

    /**
     * 字符串减法
     */
    _subtractStrings(a, b) {
        const maxLen = Math.max(a.length, b.length);
        a = a.padStart(maxLen, '0');
        b = b.padStart(maxLen, '0');

        let borrow = 0;
        let result = '';

        for (let i = maxLen - 1; i >= 0; i--) {
            let diff = parseInt(a[i]) - parseInt(b[i]) - borrow;

            if (diff < 0) {
                diff += 10;
                borrow = 1;
            } else {
                borrow = 0;
            }

            result = diff + result;
        }

        // 移除前导零
        result = result.replace(/^0+/, '') || '0';
        return result;
    }

    /**
     * 格式化结果
     */
    _formatResult(value, scale) {
        if (scale === 0) return value;

        // 确保有足够的小数位
        while (value.length <= scale) {
            value = '0' + value;
        }

        const integerPart = value.slice(0, -scale);
        const decimalPart = value.slice(-scale);

        return (integerPart || '0') + '.' + decimalPart;
    }

    /**
     * 精确加法
     */
    add(a, b) {
        const aInt = this._toInteger(a);
        const bInt = this._toInteger(b);
        const aligned = this._align(aInt, bInt);

        const result = this._addStrings(aligned.a.value, aligned.b.value);
        return this._formatResult(result, aligned.a.scale);
    }

    /**
     * 精确减法
     */
    subtract(a, b) {
        const aInt = this._toInteger(a);
        const bInt = this._toInteger(b);
        const aligned = this._align(aInt, bInt);

        const result = this._subtractStrings(aligned.a.value, aligned.b.value);
        return this._formatResult(result, aligned.a.scale);
    }

    /**
     * 精确比较
     */
    equals(a, b) {
        return this.add(a, '0') === this.add(b, '0');
    }

    /**
     * 精确乘法（简化版）
     */
    multiply(a, b) {
        const aInt = this._toInteger(a);
        const bInt = this._toInteger(b);

        // 简化的乘法实现
        const result = (parseInt(aInt.value) * parseInt(bInt.value)).toString();
        const scale = aInt.scale + bInt.scale;

        return this._formatResult(result, scale);
    }
}