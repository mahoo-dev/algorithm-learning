import { expect } from "chai";
import { UnionFind } from "./union-find";

describe("UnionFind", () => {
    it("should initialize correctly", () => {
        const uf = new UnionFind(5);
        expect(uf.find(0)).to.equal(0);
        expect(uf.find(1)).to.equal(1);
        expect(uf.find(2)).to.equal(2);
        expect(uf.find(3)).to.equal(3);
        expect(uf.find(4)).to.equal(4);
    });

    it("should perform union operations correctly", () => {
        const uf = new UnionFind(5);
        uf.union(0, 1);
        expect(uf.isConnected(0, 1)).to.be.true;
        expect(uf.isConnected(0, 2)).to.be.false;

        uf.union(2, 3);
        expect(uf.isConnected(2, 3)).to.be.true;
        expect(uf.isConnected(0, 2)).to.be.false;

        uf.union(0, 3); // Union by rank/size should connect 0-1 and 2-3
        expect(uf.isConnected(0, 3)).to.be.true;
        expect(uf.isConnected(1, 2)).to.be.true;
        expect(uf.isConnected(0, 4)).to.be.false;
    });

    it("should handle union of already connected components", () => {
        const uf = new UnionFind(3);
        uf.union(0, 1);
        expect(uf.isConnected(0, 1)).to.be.true;
        uf.union(0, 1); // Union again
        expect(uf.isConnected(0, 1)).to.be.true; // Still connected
        expect(uf.find(0)).to.equal(uf.find(1)); // Roots should be the same
    });

    it("should perform path compression", () => {
        const uf = new UnionFind(5);
        // Create a chain: 0 -> 1 -> 2 -> 3 -> 4
        // Manually setting parent for testing path compression, not typical usage
        // @ts-ignore access private member for testing
        uf.parent = [1, 2, 3, 4, 4]; 
        // @ts-ignore access private member for testing
        uf.rank = [1,1,1,1,2]; // ensure 4 is root of 3

        // find(0) should compress path 0->1->2->3->4 to 0->4, 1->4, 2->4, 3->4
        uf.find(0);
        // @ts-ignore access private member for testing
        expect(uf.parent[0]).to.equal(4); // Parent of 0 should be 4 (root)
        // @ts-ignore access private member for testing
        expect(uf.parent[1]).to.equal(4); // Parent of 1 should be 4 (root)
        // @ts-ignore access private member for testing
        expect(uf.parent[2]).to.equal(4); // Parent of 2 should be 4 (root)
        // @ts-ignore access private member for testing
        expect(uf.parent[3]).to.equal(4); // Parent of 3 should be 4 (root)
    });

    it("should correctly check connectivity", () => {
        const uf = new UnionFind(10);
        uf.union(0, 1);
        uf.union(1, 2);
        uf.union(3, 4);
        uf.union(8, 9);

        expect(uf.isConnected(0, 2)).to.be.true;
        expect(uf.isConnected(0, 1)).to.be.true;
        expect(uf.isConnected(1, 2)).to.be.true;
        expect(uf.isConnected(3, 4)).to.be.true;
        expect(uf.isConnected(8, 9)).to.be.true;

        expect(uf.isConnected(0, 3)).to.be.false;
        expect(uf.isConnected(2, 3)).to.be.false;
        expect(uf.isConnected(4, 5)).to.be.false;
        expect(uf.isConnected(0, 8)).to.be.false;
    });

    it("should handle union by rank correctly", () => {
        const uf = new UnionFind(5);
        // Union (0,1), rank of root(0) becomes 2
        uf.union(0, 1);
        // @ts-ignore access private member for testing
        const root0 = uf.find(0);

        // Union (2,3), rank of root(2) becomes 2
        uf.union(2, 3);
        // @ts-ignore access private member for testing
        const root2 = uf.find(2);

        // Union (0,2). Ranks are equal. root(0) becomes parent of root(2). Rank of root(0) becomes 3.
        uf.union(0, 2);
        // @ts-ignore access private member for testing
        expect(uf.parent[root2]).to.equal(root0);
        // @ts-ignore access private member for testing
        expect(uf.rank[root0]).to.equal(3);

        // Union (4,0). root(0) has higher rank. root(0) becomes parent of root(4). Rank of root(0) remains 3.
        uf.union(4,0); // 4 is a single node, its root is 4, rank is 1
        // @ts-ignore access private member for testing
        const root4 = uf.find(4); // This will be root0 after union
        // @ts-ignore access private member for testing
        expect(uf.parent[4]).to.equal(root0); // if 4 was its own root, its parent becomes root0
        // @ts-ignore access private member for testing
        expect(uf.rank[root0]).to.equal(3);
    });
});