export const arrayMarking = (matrix: number[][])=> {
    const row = matrix.length;
    const col = matrix[0].length;
    const matrix_copy: number[][] = Array.from({ length: row }, () => []);
    //复制矩阵
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            matrix_copy[i][j] = matrix[i][j];
        }
    }
    //第 col 列全部置为 0
    const  setColZeroes = (matrix: number[][],  col: number) => {
        for (let i = 0; i < matrix.length; i++) {
            matrix[i][col] = 0;
        }
    }
    //第 rol 行全部置为 0
    const setRowZeroes =  (matrix: number[][], row: number)=> {
        for (let i = 0; i < matrix[row].length; i++) {
            matrix[row][i] = 0;
        }
    }
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            // 找到 0 的位置
            if (matrix_copy[i][j] == 0) {
                //将当前行，当前列置为 0
                setRowZeroes(matrix, i);
                setColZeroes(matrix, j);
            }

        }
    }
}

export function markingInPlace(matrix: number[][]): void {
    const m = matrix.length;
    const n = matrix[0].length;
    let isCol = false; // 标记第一列是否清零

    // 第一步：先用第一行第一列做标记
    for (let i = 0; i < m; i++) {
        if (matrix[i][0] === 0) isCol = true;

        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0; // 标记第 i 行
                matrix[0][j] = 0; // 标记第 j 列
            }
        }
    }

    // 第二步：根据标记置零（从后往前避免提前覆盖标记）
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 1; j--) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
        if (isCol) {
            matrix[i][0] = 0;
        }
    }
}