export function backtracking(nums: number[]): number[][] {
    // 存储所有排列结果
    const result: number[][] = [];
    // 存储当前正在构建的排列
    const current: number[] = [];
    // 标记数字是否已使用（默认全未使用）
    const used: boolean[] = new Array(nums.length).fill(false);

    // 定义回溯函数
    function backtrack() {
        // 当前排列已完整，添加到结果中（注意深拷贝）
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }

        // 遍历所有数字
        for (let i = 0; i < nums.length; i++) {
            // 跳过已使用的数字
            if (used[i]) continue;

            // 选择当前数字
            used[i] = true;          // 标记为已使用
            current.push(nums[i]);   // 加入当前排列

            // 递归：基于当前选择继续构建排列
            backtrack();

            // 回溯：撤销选择（返回岔路口）
            current.pop();           // 移除最后加入的数字
            used[i] = false;         // 标记为未使用
        }
    }

    // 启动回溯过程
    backtrack();
    return result;
}



export function inserting(nums: number[]): number[][] {
    let result: number[][] = [[]];

    for (const num of nums) {
        const newResult: number[][] = [];

        for (const perm of result) {
            // 将 num 插入 perm 的所有位置
            for (let i = 0; i <= perm.length; i++) {
                const newPerm = [...perm.slice(0, i), num, ...perm.slice(i)];
                newResult.push(newPerm);
            }
        }

        result = newResult;
    }

    return result;
}
