// 146. LRU Cache
export class Node {
  key: number;
  value: number;
  next: Node | null = null;
  prev: Node | null = null;

  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
  }
}

class LRUCache {
  private capacity: number;
  private cache: Map<number, Node>;
  private head: Node;
  private tail: Node;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map<number, Node>();

    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: number): number {
    const node = this.cache.get(key);
    if (!node) return -1;

    this.removeNode(node);
    this.addToHead(node);
    return node.value;
  }

  put(key: number, value: number): void {
    const node = this.cache.get(key);
    if (node) {
      node.value = value;
      this.removeNode(node);
      this.addToHead(node);
    } else {
      const newNode = new Node(key, value);
      this.cache.set(key, newNode);
      this.addToHead(newNode);

      if (this.cache.size > this.capacity) {
        const lastNode = this.tail.prev!;
        this.removeNode(lastNode);
        this.cache.delete(lastNode.key);
      }
    }
  }

  private addToHead(node: Node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  private removeNode(node: Node) {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
