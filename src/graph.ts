export class Graph<T> {
    // 使用 Map 存储节点及其邻居列表
    protected adjacencyList: Map<T, T[]>;

    constructor() {
        this.adjacencyList = new Map();
    }

    // 添加节点
    addNode(node: T): void {
        if (!this.adjacencyList.has(node)) {
            this.adjacencyList.set(node, []);
        }
    }

    // 添加边（无向图）
    addEdge(node1: T, node2: T): void {
        if (!this.adjacencyList.has(node1)) this.addNode(node1);
        if (!this.adjacencyList.has(node2)) this.addNode(node2);

        this.adjacencyList.get(node1)?.push(node2);
        this.adjacencyList.get(node2)?.push(node1); // 有向图则删除此行
    }

    // 获取所有节点
    getNodes(): T[] {
        return Array.from(this.adjacencyList.keys());
    }

    // 获取邻居
    getNeighbors(node: T): T[] {
        return this.adjacencyList.get(node) || [];
    }
}

