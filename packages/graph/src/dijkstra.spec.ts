import { expect } from "chai";
import { Dijkstra } from "./dijkstra";

describe("graph Dijkstra algorithm", () => {
  let graph: Dijkstra<number>;

  beforeEach(() => {
    graph = new Dijkstra<number>();
    // 构建测试图
    /*
      0---4---1
      |   | / 
      2---3
    */
    graph.addWeightedEdge(0, 2, 1);
    graph.addWeightedEdge(0, 4, 2);
    graph.addWeightedEdge(2, 3, 1);
    graph.addWeightedEdge(3, 1, 3);
    graph.addWeightedEdge(4, 1, 5);
    graph.addWeightedEdge(4, 3, 2);
  });

  it("should find shortest paths from node 0", () => {
    const { distances, predecessors } = graph.shortestPath(0);
    expect(distances.get(1)).to.equal(5); // 0-2-3-1 (1+1+3)
    expect(Dijkstra.getPath(predecessors, 3)).to.deep.equal([0, 2, 3]);
    expect(Dijkstra.getPath(predecessors, 1)).to.deep.equal([0, 2, 3, 1]);
  });

  it("should handle unreachable nodes", () => {
    graph.addNode(5); // 孤立节点
    const { distances } = graph.shortestPath(0);
    expect(distances.get(5)).to.equal(Infinity);
  });

  it("should find new shortest path when adding intermediate node", () => {
    // 添加新路径：0-6-1 (1+1=2)
    graph.addWeightedEdge(0, 6, 1);
    graph.addWeightedEdge(6, 1, 1);

    // 确保节点6被正确添加
    expect(graph.getNodes()).to.include(6);
    // 验证6的邻居
    expect(graph.getNeighbors(6)).to.deep.equal([
      { node: 0, weight: 1 },
      { node: 1, weight: 1 },
    ]);

    const { distances, predecessors } = graph.shortestPath(0);

    // 验证新路径
    expect(distances.get(1)).to.equal(2); // 0-6-1
    expect(Dijkstra.getPath(predecessors, 1)).to.deep.equal([0, 6, 1]);

    // 路径回溯验证：验证到节点6的路径
    expect(Dijkstra.getPath(predecessors, 6)).to.deep.equal([0, 6]);

    // 验证原有路径仍然有效
    expect(distances.get(3)).to.equal(2); // 0-2-3

    // // 修改6-1的权重为3，验证路径切换回原路径
    // graph.addWeightedEdge(6, 1, 3);
    // const updated = graph.shortestPath(0);
    // expect(updated.distances.get(1)).to.equal(5); // 回到0-2-3-1
  });
  it("performance test with 1000 nodes", () => {
    const bigGraph = new Dijkstra<number>();
    // 构建包含1000个节点的全连通图
    for (let i = 0; i < 1000; i++) {
      for (let j = i + 1; j < 1000; j++) {
        bigGraph.addWeightedEdge(i, j, Math.random() * 100);
      }
    }

    const startTime = Date.now();
    bigGraph.shortestPath(0);
    const duration = Date.now() - startTime;

    expect(duration).to.be.lessThan(1000); // 根据机器性能调整阈值
  });
});
