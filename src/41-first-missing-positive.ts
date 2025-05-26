export function swappingToCorrectIndex(nums: number[]): number {
    const n = nums.length;

    // Step 1: 原地置换
    for (let i = 0; i < n; i++) {
        while (
            nums[i] > 0 &&
            nums[i] <= n &&
            nums[nums[i] - 1] !== nums[i]
            ) {
            // 把 nums[i] 放到正确的位置 nums[nums[i] - 1]
            const correctIndex = nums[i] - 1;
            [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
        }
    }

    // Step 2: 找第一个不符合 nums[i] === i + 1 的位置
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) {
            return i + 1;
        }
    }

    // 所有位置都符合，则说明缺失的是 n + 1
    return n + 1;
}


export function markingByNegation(nums: number[]): number {
    const n = nums.length
    for (let i = 0; i < n; i++) {
        if (nums[i] <= 0) nums[i] = n + 1
    }
    for (let i = 0; i < n; i++) {
        const num = Math.abs(nums[i])
        if (num <= n) {
            nums[num - 1] = -Math.abs(nums[num - 1])
        }
    }
    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) return i + 1
    }
    return n + 1
};