import { Graph } from "./graph";

export class Traverse<T> extends Graph<T> {

    /**
     * 深度优先搜索（DFS）的递归实现，从起始节点开始，递归地访问每个邻接节点
     * @param start
     * @returns
     */
    dfs(start: T): T[] {
        const visited = new Set<T>();
        const result: T[] = [];

        const dfsVisit = (node: T) => {
            if (visited.has(node)) return;
            visited.add(node);
            result.push(node);
            const neighbors = this.getNeighbors(node);
            for (const neighbor of neighbors) {
                dfsVisit(neighbor);
            }
        };

        dfsVisit(start);
        return result;
    }

    /**
     * 深度优先搜索（DFS）的栈实现，使用栈来模拟递归过程，避免递归调用栈的限制
     * @param start
     * @returns
     */
    dfsStack(start: T): T[] {
        const stack: T[] = [start];
        const visited = new Set<T>();
        const result: T[] = [];

        while (stack.length > 0) {
            const node = stack.pop()!; // 弹出栈顶
            if (!visited.has(node)) {
                visited.add(node);
                result.push(node);
                // 将邻居逆序入栈，保证顺序与递归一致
                const neighbors = this.getNeighbors(node).reverse();
                for (const neighbor of neighbors) {
                    stack.push(neighbor);
                }
            }
        }
        return result;
    }

    /**
     * 广度优先搜索（BFS），从起始节点开始，逐层访问所有邻接节点，使用队列来实现
     * @param start
     * @returns
     */
    bfs(start: T): T[] {
        const queue: T[] = [start];
        const visited = new Set<T>();
        const result: T[] = [];

        visited.add(start);

        while (queue.length > 0) {
            const node = queue.shift()!; // 从队列头部取出
            result.push(node);
            const neighbors = this.getNeighbors(node);
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
        return result;
    }
}
