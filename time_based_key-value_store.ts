// 981. Time Based Key-Value Store
// Time: O(log N) for get, O(1) for set
// Space: O(N) for storing all entries
class TimeMap {
  private store: Map<string, {timestamp: number; value: string}[]>;

  constructor() {
    this.store = new Map();
  }

  set(key: string, value: string, timestamp: number): void {
    if (!this.store.has(key)) this.store.set(key, []);

    this.store.get(key)!.push({timestamp, value});
  }

  get(key: string, timestamp: number): string {
    const entries = this.store.get(key);
    if (!entries) return "";

    let left = 0;
    let right = entries.length - 1;
    let result = "";

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const entry = entries[mid];

      if (entry.timestamp < timestamp) {
        result = entry.value;
        left = mid + 1;
      } else if (entry.timestamp > timestamp) {
        right = mid - 1;
      } else {
        return entry.value;
      }
    }

    return result;
  }
}

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */
