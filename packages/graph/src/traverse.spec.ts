import { expect } from "chai";
import {Traverse} from "./traverse";

describe("graph traverse", () => {

    const graph = new Traverse<string>();

    graph.addEdge("A", "B");
    graph.addEdge("A", "C");
    graph.addEdge("B", "D");
    graph.addEdge("C", "D");

    // A —— B
    // |    |
    // C —— D

    it("should traverse the graph using DFS recursively", () => {
        expect(graph.dfs("A")).to.deep.equal(['A', 'B', 'D', 'C'])
    });
    it("should traverse the graph using DFS with a stack ", () => {
        expect(graph.dfsStack("A")).to.deep.equal(['A', 'B', 'D', 'C'])
    });
    it("should traverse the graph using BFS", () => {
        expect(graph.bfs("A")).to.deep.equal(['A', 'C', 'B', 'D'])
    });
});