import { WeightedGraph } from "./weighted-graph";

export class FloydWarshall<T> extends WeightedGraph<T> {
  shortestPaths() {
    const nodes = this.getNodes().sort();
    const size = nodes.length;
    const dist: number[][] = Array.from({ length: size }, () =>
      Array(size).fill(Infinity)
    );

    // 建立节点到索引的映射
    const nodeIndex = new Map<T, number>();
    nodes.forEach((node, index) => nodeIndex.set(node, index));

    // 初始化距离矩阵
    nodes.forEach((node, i) => {
      dist[i][i] = 0; // 节点到自身距离为0
      const neighbors = this.getNeighbors(node);
      neighbors.forEach((neighbor) => {
        const j = nodeIndex.get(neighbor.node)!;
        // 跳过自环边（节点自身到自身）
        if (i !== j) {
          dist[i][j] = Math.min(dist[i][j], neighbor.weight); // 直接邻居的初始权重
        }
      });
    });

    // 三重循环更新距离
    for (let k = 0; k < size; k++) {
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
          }
        }
      }
    }

    return dist;
  }
}
