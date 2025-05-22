import { WeightedGraph } from "./weighted-graph";

export class Dijkstra<T> extends WeightedGraph<T> {
  // 获取从 start 到所有节点的最短距离
  shortestPath(start: T) {
    const distances = new Map<T, number>();
    const predecessors = new Map<T, T>();
    const priorityQueue = new PriorityQueue<T>(
      (a, b) => distances.get(a)! - distances.get(b)!
    );

    // 初始化距离为无穷大，起点距离为0
    this.getNodes().forEach((node) => {
      if (node !== start) {
        distances.set(node, Infinity);
      }
    });
    distances.set(start, 0);
    priorityQueue.enqueue(start);
    const processed = new Set<T>();

    while (!priorityQueue.isEmpty()) {
      const current = priorityQueue.dequeue()!;
      if (processed.has(current)) continue;
      processed.add(current);

      const currentDist = distances.get(current)!;

      this.adjacencyList.get(current).forEach(({ node: neighbor, weight }) => {
        const newDist = currentDist + weight;
        if (newDist < (distances.get(neighbor) ?? Infinity)) {
          distances.set(neighbor, newDist);
          predecessors.set(neighbor, current);
          priorityQueue.enqueue(neighbor); // 可能需要重复入队，但优先队列会处理
        }
      });
    }

    return { distances, predecessors };
  }

  // 重构路径（从终点回溯到起点）
  static getPath<T>(predecessors: Map<T, T>, end: T): T[] {
    const path: T[] = [];
    let current: T | undefined = end;
    while (current !== undefined) {
      path.unshift(current);
      current = predecessors.get(current);
    }
    return path;
  }
}

// 优先队列实现（需自行实现或使用第三方库）
class PriorityQueue<T> {
  private readonly heap: T[];
  private readonly compare: (a: T, b: T) => number;

  constructor(compare: (a: T, b: T) => number) {
    this.heap = [];
    this.compare = compare;
  }

  enqueue(element: T): void {
    this.heap.push(element);
    this.bubbleUp(this.heap.length - 1);
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.compare(this.heap[index], this.heap[parent]) >= 0) break;
      [this.heap[index], this.heap[parent]] = [
        this.heap[parent],
        this.heap[index],
      ];
      index = parent;
    }
  }

  dequeue(): T | undefined {
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0 && end !== undefined) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return min;
  }

  private sinkDown(index: number): void {
    const length = this.heap.length;
    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;

      if (
        left < length &&
        this.compare(this.heap[left], this.heap[smallest]) < 0
      ) {
        smallest = left;
      }
      if (
        right < length &&
        this.compare(this.heap[right], this.heap[smallest]) < 0
      ) {
        smallest = right;
      }
      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }
}
