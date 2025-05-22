import { WeightedGraph } from "./weighted-graph";

export class BellmanFord<T> extends WeightedGraph<T> {

  /**
   * 邻接表存储的是有向边，当处理无向图时会导致重复访问边，应改为遍历所有边的集合
   * @deprecated
   * @param start 
   * @returns 
   */
  __shortestPath__(start: T) {
    const distances = new Map<T, number>();
    let hasNegativeCycle = false;

    // 初始化距离
    this.getNodes().forEach((node) => {
      if (node !== start) {
        distances.set(node, Infinity);
      }
    });
    distances.set(start, 0);

    // 松弛所有边 V-1 次
    const size = this.getNodes().length;
    for (let i = 0; i < size - 1; i++) {
      this.adjacencyList.forEach((neighbors, u) => {
        neighbors.forEach(({ node: v, weight }) => {
          if (distances.get(u)! + weight < (distances.get(v) ?? Infinity)) {
            distances.set(v, distances.get(u)! + weight);
          }
        });
      });
    }

    // 检测负权环（第 V 次松弛）
    this.adjacencyList.forEach((neighbors, u) => {
      neighbors.forEach(({ node: v, weight }) => {
        if (distances.get(u)! + weight < (distances.get(v) ?? Infinity)) {
          hasNegativeCycle = true;
        }
      });
    });

    return { distances, hasNegativeCycle };
  }
  shortestPath(start: T) {
    if (!this.hasNode(start)) {
      throw new Error("Start node not in graph");
    }

    const distances = new Map<T, number>();
    let hasNegativeCycle = false;
    const edges = this.getAllEdges();

    // 初始化距离
    this.getNodes().forEach((node) =>
      distances.set(node, node === start ? 0 : Infinity)
    );

    // 松弛边 V-1 次
    const size = this.getNodes().length;
    for (let i = 0; i < size - 1; i++) {
      for (const { u, v, weight } of edges) {
        if (distances.get(u)! + weight < distances.get(v)!) {
          distances.set(v, distances.get(u)! + weight);
        }
      }
    }

    // 检测负权环（第 V 次松弛）
    for (const { u, v, weight } of edges) {
      if (distances.get(u)! + weight < distances.get(v)!) {
        hasNegativeCycle = true;
        break;
      }
    }

    return {
      distances: hasNegativeCycle ? new Map() : distances,
      hasNegativeCycle,
    };
  }
  hasNode(start: T) {
    return this.adjacencyList.has(start);
  }

  private getAllEdges(): { u: T; v: T; weight: number }[] {
    const edges: { u: T; v: T; weight: number }[] = [];
    this.adjacencyList.forEach((neighbors, u) => {
      neighbors.forEach(({ node: v, weight }) => {
        edges.push({ u, v, weight });
      });
    });
    return edges;
  }
}
