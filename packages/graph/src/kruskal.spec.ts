import { expect } from "chai";
import { Kruskal } from "./kruskal";

describe("Graph Kruskal Algorithm", () => {
    it("should find the MST for a simple graph", () => {
        const edges = [
            { u: 0, v: 1, weight: 10 },
            { u: 0, v: 2, weight: 6 },
            { u: 0, v: 3, weight: 5 },
            { u: 1, v: 3, weight: 15 },
            { u: 2, v: 3, weight: 4 },
        ];
        const numNodes = 4;
        const { mstEdges, totalWeight } = Kruskal.findMST(edges, numNodes);

        // Expected MST edges (sorted by weight, then u, then v for consistent comparison)
        const expectedMst = [
            { u: 2, v: 3, weight: 4 },
            { u: 0, v: 3, weight: 5 },
            { u: 0, v: 1, weight: 10 },
        ].sort((a,b) => a.weight - b.weight || a.u - b.u || a.v - b.v);

        const sortedMstEdges = mstEdges.sort((a,b) => a.weight - b.weight || a.u - b.u || a.v - b.v);

        expect(sortedMstEdges).to.deep.equal(expectedMst);
        expect(totalWeight).to.equal(19);
    });

    it("should handle a graph with multiple components initially", () => {
        const edges = [
            { u: 0, v: 1, weight: 1 }, // Component 1
            { u: 2, v: 3, weight: 2 }, // Component 2
            { u: 0, v: 2, weight: 100 } // Edge to connect components
        ];
        const numNodes = 4;
        const { mstEdges, totalWeight } = Kruskal.findMST(edges, numNodes);
        
        const expectedMst = [
            { u: 0, v: 1, weight: 1 },
            { u: 2, v: 3, weight: 2 },
            { u: 0, v: 2, weight: 100 },
        ].sort((a,b) => a.weight - b.weight || a.u - b.u || a.v - b.v);

        const sortedMstEdges = mstEdges.sort((a,b) => a.weight - b.weight || a.u - b.u || a.v - b.v);

        expect(sortedMstEdges).to.deep.equal(expectedMst);
        expect(totalWeight).to.equal(103);
    });

    it("should handle a graph that is already a tree (MST has all edges)", () => {
        const edges = [
            { u: 0, v: 1, weight: 1 },
            { u: 1, v: 2, weight: 2 },
            { u: 2, v: 3, weight: 3 },
        ];
        const numNodes = 4;
        const { mstEdges, totalWeight } = Kruskal.findMST(edges, numNodes);

        const expectedMst = [...edges].sort((a,b) => a.weight - b.weight || a.u - b.u || a.v - b.v);
        const sortedMstEdges = mstEdges.sort((a,b) => a.weight - b.weight || a.u - b.u || a.v - b.v);

        expect(sortedMstEdges).to.deep.equal(expectedMst);
        expect(totalWeight).to.equal(6);
    });

    it("should return an empty MST for a graph with no edges", () => {
        const edges: { u: number; v: number; weight: number }[] = [];
        const numNodes = 3;
        const { mstEdges, totalWeight } = Kruskal.findMST(edges, numNodes);
        expect(mstEdges).to.deep.equal([]);
        expect(totalWeight).to.equal(0);
    });

    it("should return an empty MST for a single node graph", () => {
        const edges: { u: number; v: number; weight: number }[] = [];
        const numNodes = 1;
        const { mstEdges, totalWeight } = Kruskal.findMST(edges, numNodes);
        expect(mstEdges).to.deep.equal([]);
        expect(totalWeight).to.equal(0);
    });

    it("should handle disconnected graph (forest) correctly", () => {
        // If numNodes implies a connected graph is expected, but edges form a forest,
        // Kruskal will find MST for each component. The total edges will be < numNodes - 1.
        const edges = [
            { u: 0, v: 1, weight: 1 }, // Component 1
            { u: 2, v: 3, weight: 2 }, // Component 2
        ];
        const numNodes = 4; // Expects 3 edges for a full MST
        const { mstEdges, totalWeight } = Kruskal.findMST(edges, numNodes);

        const expectedMst = [...edges].sort((a,b) => a.weight - b.weight || a.u - b.u || a.v - b.v);
        const sortedMstEdges = mstEdges.sort((a,b) => a.weight - b.weight || a.u - b.u || a.v - b.v);

        expect(sortedMstEdges).to.deep.equal(expectedMst);
        expect(totalWeight).to.equal(3);
        expect(mstEdges.length).to.equal(numNodes - 2); // Two components, so N-2 edges
    });

    it("should correctly handle edges with same weights", () => {
        const edges = [
            { u: 0, v: 1, weight: 1 },
            { u: 1, v: 2, weight: 2 },
            { u: 0, v: 2, weight: 2 }, // Cycle with 0-1-2, this edge should be ignored or 1-2 ignored
            { u: 2, v: 3, weight: 3 },
        ];
        const numNodes = 4;
        const { mstEdges, totalWeight } = Kruskal.findMST(edges, numNodes);
        // The MST should include (0,1,1), (2,3,3) and one of (1,2,2) or (0,2,2)
        // Total weight should be 1 + 2 + 3 = 6
        expect(totalWeight).to.equal(6);
        expect(mstEdges.length).to.equal(numNodes - 1);

        // Verify that no cycle is formed. One way is to check connectivity.
        // This is implicitly tested by the algorithm logic, but good to be aware.
        // A more robust check would be to ensure the selected edges form a tree.
    });
});