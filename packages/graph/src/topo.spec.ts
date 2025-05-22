import { expect } from "chai";
import { Topo } from "./topo";

describe("graph topological sorting", () => {

    // 课程表（LeetCode 207题）
    // 假设课程依赖关系如下（无环）：
    // - 课程 1 依赖课程 0（边 `0 → 1`）
    // - 课程 2 依赖课程 1（边 `1 → 2`）
    // - 课程 3 依赖课程 1（边 `1 → 3`）

    const graph = new Topo<number>();
    graph.addDirectedEdge(0, 1);
    graph.addDirectedEdge(1, 2);
    graph.addDirectedEdge(1, 3);


    it("should return a valid topological order using Kahn's algorithm", () => {
        const result = graph.topologicalSort();
        // 拓扑排序结果可能为 [0, 1, 2, 3] 或 [0, 1, 3, 2]
        expect(result).to.satisfy((arr: number[]) => {
            return arr.toString() === [0, 1, 2, 3].toString() || arr.toString() === [0, 1, 3, 2].toString();
        });
    });
    
    it("should return a valid topological order using DFS with post-order traversal and reversal", () => {
        const result = graph.topologicalSortDFS();
        // 拓扑排序结果可能为 [0, 1, 3, 2] 或类似
        expect(result).to.satisfy((arr: number[]) => {
            return arr.toString() === [0, 1, 3, 2].toString() || arr.toString() === [0, 1, 2, 3].toString();
        });
    });
});