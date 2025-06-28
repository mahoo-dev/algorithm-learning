export function floatEqual(a, b, toleranceFactor = 1) {
    // 处理特殊值
    if (!Number.isFinite(a) || !Number.isFinite(b))
        return a === b;

    // 完全相等（包括+0/-0）
    if (a === b) return true;

    // 计算差值
    const diff = Math.abs(a - b);

    // 处理接近零的情况
    if (Math.abs(a) < Number.MIN_VALUE || Math.abs(b) < Number.MIN_VALUE) {
        return diff < Number.EPSILON * toleranceFactor;
    }

    // 获取两数中较大的指数
    const exp = Math.max(getExponent(a), getExponent(b));

    // 计算该指数区间的理论最小精度单位
    const ulp = Math.pow(2, exp) * Number.EPSILON;

    // 比较
    return diff <= ulp * toleranceFactor;
}

// 获取浮点数指数部分
function getExponent(x) {
    if (x === 0) return 0;
    const float64 = new Float64Array(1);
    float64[0] = x;
    const view = new DataView(float64.buffer);
    const bits = view.getBigUint64(0, true);
    // @ts-ignore
    return Number((bits >> 52n) & 0x7FFn) - 1023;
}

// 获取数值的ULP
function getULP(x) {
    if (x === 0) return Number.MIN_VALUE;
    const exp = getExponent(x);
    return Math.pow(2, exp) * Number.EPSILON;
}