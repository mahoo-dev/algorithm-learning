import { expect } from "chai";
import { BellmanFord } from "./bellman-ford";

describe("graph Bellman-Ford algorithm", () => {
  let graph: BellmanFord<number>;

  beforeEach(() => {
    graph = new BellmanFord<number>();
  });

  it("should find shortest paths without negative cycles", () => {
    /*
      0->1 (4)
      |  ^
      v / 
      2 (-2)
    */
    graph.addDirectedWeightedEdge(0, 1, 4);
    graph.addDirectedWeightedEdge(0, 2, 3);
    graph.addDirectedWeightedEdge(2, 1, -2);

    const result = graph.shortestPath(0);
    expect(result.hasNegativeCycle).to.be.false;
    expect(result.distances.get(1)).to.equal(1); // 0->2->1
  });

  it("should detect negative weight cycles", () => {
    /*
      总权重-1的环：
      0-(1)->1
  (1) ^     |
      |     v (1)
      3<-(-4)-2
    */
    graph.addDirectedWeightedEdge(0, 1, 1);
    graph.addDirectedWeightedEdge(1, 2, 1);
    graph.addDirectedWeightedEdge(2, 3, -4);
    graph.addDirectedWeightedEdge(3, 0, 1); // 修改此处权重

    const result = graph.shortestPath(0);
    expect(result.hasNegativeCycle).to.be.true;
  });

  it("should handle negative weights correctly", () => {
    /*
      0-(-2)->1
      |     / 
      v    /  
      2-(5)
    */
    graph.addDirectedWeightedEdge(0, 1, -2);
    graph.addDirectedWeightedEdge(0, 2, 3);
    graph.addDirectedWeightedEdge(2, 1, 5);

    const result = graph.shortestPath(0);
    expect(result.distances.get(1)).to.equal(-2);
    expect(result.distances.get(2)).to.equal(3);
  });

  it("should handle unreachable nodes", () => {
    graph.addNode(0);
    graph.addNode(1);
    const result = graph.shortestPath(0);
    expect(result.distances.get(1)).to.equal(Infinity);
  });

  it("should handle an extreme case", () => {
    /*
        0→1→2
        ↓ ↗ ↑
        3←4←5
    */
    graph.addDirectedWeightedEdge(0, 1, 2);
    graph.addDirectedWeightedEdge(0, 3, 1);
    graph.addDirectedWeightedEdge(1, 2, 3);
    graph.addDirectedWeightedEdge(3, 2, 1);
    graph.addDirectedWeightedEdge(5, 4, 2);
    graph.addDirectedWeightedEdge(4, 3, 1);
    graph.addDirectedWeightedEdge(2, 4, 1);
    const result = graph.shortestPath(0);
    expect(result.distances.get(5)).to.equal(Infinity);
  });

  it("should handle edge order sensitivity", () => {
    /*
        正确构建链状图：
        0 → 1 → 2 → 3 （边按逆序添加）
    */
    // 故意逆序添加边
    graph.addDirectedWeightedEdge(2, 3, 1); // 2→3
    graph.addDirectedWeightedEdge(1, 2, 1); // 1→2
    graph.addDirectedWeightedEdge(0, 1, 1); // 0→1

    const result = graph.shortestPath(0);

    // 验证正确的最短路径
    expect(result.distances.get(3)).to.equal(3); // 0→1→2→3 (1+1+1)
  });
});
