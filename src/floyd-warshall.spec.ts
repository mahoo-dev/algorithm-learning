import { expect } from "chai";
import { FloydWarshall } from "./floyd-warshall";

describe("graph FloydWarshall algorithm", () => {
  let graph: FloydWarshall<string>;

  beforeEach(() => {
    graph = new FloydWarshall<string>();
  });

  it("should handle the shortest path of a directed graph correctly", () => {
    // 构造测试图：A->B(1), B->C(2), A->C(5)
    /*
      A-(1)->B
  (5) |     /
      v    /
      C<-(2)
    */
    graph.addDirectedWeightedEdge("A", "C", 5);
    graph.addDirectedWeightedEdge("B", "C", 2);
    graph.addDirectedWeightedEdge("A", "B", 1);

    const dist = graph.shortestPaths();
    const nodes = graph.getNodes().sort(); // ['A','B','C']

    expect(getDist(dist, nodes, "A", "C")).to.equal(3); // 通过B中转
    expect(getDist(dist, nodes, "B", "A")).to.equal(Infinity); // 不可达
  });

  it("should handle negative weight edges (without negative weight rings)", () => {
    // A->B(-1), B->C(2)
    graph.addDirectedWeightedEdge("A", "B", -1);
    graph.addDirectedWeightedEdge("B", "C", 2);

    const dist = graph.shortestPaths();
    const nodes = graph.getNodes().sort();

    expect(getDist(dist, nodes, "A", "C")).to.equal(1); // -1 + 2
    expect(getDist(dist, nodes, "A", "B")).to.equal(-1);
  });

  it("should handle the self-loop edge correctly", () => {
    graph.addDirectedWeightedEdge("A", "A", 5); // 自环边
    const dist = graph.shortestPaths();
    expect(getDist(dist, ["A"], "A", "A")).to.equal(0); // 算法应保持对角线为0
  });

  it("should handle the unreachable node", () => {
    graph.addNode("A");
    graph.addNode("B");
    const dist = graph.shortestPaths();
    expect(getDist(dist, ["A", "B"], "A", "B")).to.equal(Infinity);
  });

  it("should handle the case with multiple intermediate nodes correctly", () => {
    /* 
        A->B(3)
        B->C(1)
        A->D(5)
        D->C(2
    */
    graph.addDirectedWeightedEdge("A", "B", 3);
    graph.addDirectedWeightedEdge("B", "C", 1);
    graph.addDirectedWeightedEdge("A", "D", 5);
    graph.addDirectedWeightedEdge("D", "C", 2);

    const dist = graph.shortestPaths();
    const nodes = graph.getNodes().sort(); // ['A','B','C','D']

    // A->B->C (3+1=4) 比 A->D->C(5+2=7) 更优
    expect(getDist(dist, nodes, "A", "C")).to.equal(4);
  });

  it("should handle node order variation correctly", () => {
    // 以不同顺序添加节点
    graph.addNode("C");
    graph.addNode("B");
    graph.addNode("A");
    graph.addDirectedWeightedEdge("B", "C", 2);
    graph.addDirectedWeightedEdge("A", "B", 1);

    const dist = graph.shortestPaths();
    const nodes = graph.getNodes().sort();

    expect(getDist(dist, nodes, "A", "C")).to.equal(3);
  });
});

// 辅助函数：根据节点列表获取矩阵中的距离值
function getDist(
  dist: number[][],
  nodes: string[],
  from: string,
  to: string
): number {
  const i = nodes.indexOf(from);
  const j = nodes.indexOf(to);
  return i >= 0 && j >= 0 ? dist[i][j] : Infinity;
}
