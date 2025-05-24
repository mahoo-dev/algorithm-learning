export function productExceptSelf(nums: number[]): number[] {
    const ans = []
    const n = nums.length;
    for(let i = 0, prefix = 1; i < n; i++) {
        ans[i] = prefix;
        prefix *= nums[i]
    }
    for(let i = n - 1, postfix = 1; i >= 0; i--) {
        ans[i] *= postfix;
        postfix *= nums[i]
    }
    return ans
};