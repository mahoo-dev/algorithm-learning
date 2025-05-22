export class Kruskal {
    static findMST(edges: { u: number; v: number; weight: number }[], numNodes: number): { mstEdges: { u: number; v: number; weight: number }[], totalWeight: number } {
        const sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);
        const parent = Array(numNodes).fill(0).map((_, i) => i);
        const mstEdges: { u: number; v: number; weight: number }[] = [];
        let totalWeight = 0;

        // 并查集查找根节点
        const find = (x: number): number => {
            if (parent[x] !== x) parent[x] = find(parent[x]); // 路径压缩
            return parent[x];
        };

        for (const edge of sortedEdges) {
            const rootU = find(edge.u);
            const rootV = find(edge.v);
            if (rootU !== rootV) { // 不形成环
                mstEdges.push(edge);
                totalWeight += edge.weight;
                parent[rootU] = rootV; // 合并集合
                if (mstEdges.length === numNodes - 1) break; // 已选够边
            }
        }

        return { mstEdges, totalWeight };
    }
}