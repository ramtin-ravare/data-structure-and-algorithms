import LinkedList from "./linked-list";

interface IHashTable {
  put(key: number, value: string): void;
  remove(key: number): void;
  get(key: number): Entry | null;
}
interface IEntry {
  key: number;
  value: string;
}

class HashTable implements IHashTable {
  private _entries: LinkedList<Entry>[];
  constructor() {
    this._entries = new Array<LinkedList<Entry>>(5);
  }
  // runtime complexity = O(n)
  public put(key: number, value: string): void {
    let index: number = this.hash(key);
    if (!this._entries[index]) this._entries[index] = new LinkedList();
    let bucket: LinkedList<Entry> = this._entries[index];
    let entry: Entry = new Entry(key, value);

    let entryIndex: number = this.keyIndexInBucket(bucket, key);
    if (entryIndex > -1) {
      bucket.changeValueByIndex(entryIndex, entry);
      return;
    }
    this._entries[index].addLast(entry);
  }
  // runtime complexity = O(n)
  public remove(key: number): void {
    let index: number = this.hash(key);
    let bucket: LinkedList<Entry> = this._entries[index];
    if (!bucket) throw new Error("key dosen't exist");
    let entryIndex: number = this.keyIndexInBucket(bucket, key);
    if (entryIndex === -1) throw new Error("key dosen't exist");
    bucket.removeByIndex(entryIndex);
  }
  // runtime complexity = O(n)
  public get(key: number): Entry | null {
    let index: number = this.hash(key);
    let bucket: LinkedList<Entry> = this._entries[index];
    if (!bucket) return null;
    let entryIndex: number = this.keyIndexInBucket(bucket, key);
    if (entryIndex === -1) return null;
    return bucket.getValueByIndex(entryIndex);
  }

  private hash(key: number): number {
    return key % this._entries.length;
  }
  private keyIndexInBucket(bucket: LinkedList<Entry>, key: number): number {
    let entryIndex: number = -1;
    bucket.toArray().forEach((e, i) => {
      if (e.key === key) entryIndex = i;
    });
    return entryIndex;
  }
}
class Entry implements IEntry {
  constructor(public key: number, public value: string) {}
}

class CharFinder {
  static findFirstNonRepetitiveChar(word: string): string | number {
    let map: Map<string, number> = new Map();
    word.split("").forEach((cha, i) => {
      let count: number | undefined = map.get(cha);
      count ? map.set(cha, count + 1) : map.set(cha, 1);
    });
    for (let [k, v] of map) {
      if (v === 1) return k;
    }
    return -1;
  }
  static findFirstRepetitiveChar(word: string): string | number {
    let set: Set<string> = new Set();
    let chars: string[] = word.split("");
    for (let char of chars) {
      if (set.has(char)) return char;
      set.add(char);
    }
    return -1;
  }
}

console.log(CharFinder.findFirstNonRepetitiveChar("funny")); // expected reuslt = "f"
console.log(CharFinder.findFirstRepetitiveChar("funny")); // expected result = "n"

const newHashTable: HashTable = new HashTable();
