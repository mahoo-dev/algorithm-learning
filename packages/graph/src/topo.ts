import {Graph} from "./graph";

export class Topo<T> extends Graph<T> {

    // 添加边（有向图）
    addDirectedEdge(from: T, to: T): void {
        if (!this.adjacencyList.has(from)) this.addNode(from);
        if (!this.adjacencyList.has(to)) this.addNode(to);
        this.adjacencyList.get(from)?.push(to); // 只添加单向边
    }

    // Kahn算法实现拓扑排序
    topologicalSort(): T[] | null {
        // 初始化入度表
        const inDegree = new Map<T, number>();
        const queue: T[] = [];
        const result: T[] = [];

        // 初始化所有节点的入度为0
        this.adjacencyList.forEach((_, node) => inDegree.set(node, 0));

        // 计算所有节点的入度
        this.adjacencyList.forEach((neighbors, node) => {
            neighbors.forEach(neighbor => {
                inDegree.set(neighbor, (inDegree.get(neighbor) || 0) + 1);
            });
        });

        // 将入度为0的节点加入队列
        inDegree.forEach((degree, node) => {
            if (degree === 0) queue.push(node);
        });

        // 处理队列中的节点
        while (queue.length > 0) {
            const node = queue.shift()!;
            result.push(node);

            // 减少所有邻居的入度
            this.getNeighbors(node).forEach(neighbor => {
                const newDegree = (inDegree.get(neighbor) || 0) - 1;
                inDegree.set(neighbor, newDegree);
                if (newDegree === 0) queue.push(neighbor);
            });
        }

        // 检查是否存在环（结果长度是否等于节点总数）
        return result.length === this.adjacencyList.size ? result : null;
    }

    // DFS实现拓扑排序
    topologicalSortDFS(): T[] | null {
        const visited = new Set<T>();
        const stack: T[] = [];
        const result: T[] = [];
        let hasCycle = false;

        const dfs = (node: T, visiting: Set<T>) => {
            if (visiting.has(node)) { // 发现环
                hasCycle = true;
                return;
            }
            if (visited.has(node)) return;

            visiting.add(node);
            this.getNeighbors(node).forEach(neighbor => dfs(neighbor, visiting));
            visiting.delete(node);
            visited.add(node);
            stack.push(node); // 后序压栈
        };

        this.getNodes().forEach(node => {
            if (!visited.has(node)) dfs(node, new Set<T>());
        });

        return hasCycle ? null : stack.reverse(); // 反转后序结果
    }
}