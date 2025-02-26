export class WeightedGraph<T> {
  protected adjacencyList: Map<T, { node: T; weight: number }[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addNode(node: T): void {
    if (!this.adjacencyList.has(node)) {
      this.adjacencyList.set(node, []);
    }
  }
  addEdge(node1: T, node2: T, weight: number): void {
    if (!this.adjacencyList.has(node1)) {
      this.adjacencyList.set(node1, []);
    }
    if (!this.adjacencyList.has(node2)) {
      this.adjacencyList.set(node2, []);
    }

    this.adjacencyList.get(node1)?.push({ node: node2, weight });
  }

  // 添加带权重的边（无向图）
  addWeightedEdge(node1: T, node2: T, weight: number): void {
    if (!this.adjacencyList.has(node1)) this.addNode(node1);
    if (!this.adjacencyList.has(node2)) this.addNode(node2);

    this.adjacencyList.get(node1)?.push({ node: node2, weight });
    this.adjacencyList.get(node2)?.push({ node: node1, weight }); // 有向图则删除此行
  }

  // 添加边（有向图）
  addDirectedWeightedEdge(from: T, to: T, weight: number): void {
    if (!this.adjacencyList.has(from)) this.addNode(from);
    if (!this.adjacencyList.has(to)) this.addNode(to);
    this.adjacencyList.get(from)?.push({ node: to, weight }); // 只添加单向边
  }

  getNodes(): T[] {
    return Array.from(this.adjacencyList.keys());
  }

  // 获取带权重的邻居
  getNeighbors(node: T): { node: T; weight: number }[] {
    return this.adjacencyList.get(node) || [];
  }
}
