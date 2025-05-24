export function rotate(nums: number[], k: number): void {
    const n = nums.length;
    k = k % n;
    if (k === 0) return;

    let count = 0; // 记录总共移动了多少个元素

    for (let start = 0; count < n; start++) {
        let current = start;
        let prev = nums[start];

        do {
            const next = (current + k) % n;
            const temp = nums[next];
            nums[next] = prev;
            prev = temp;
            current = next;
            count++;
        } while (start !== current); // 一轮置换结束
    }
}