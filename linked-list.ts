interface ILinkedList<T> {
  last: NodeTemp<T> | null;
  first: NodeTemp<T> | null;
  removeFirst(): void;
  removeLast(): void;
  removeByIndex(index: number): void;
  addFirst(element: T): void;
  addLast(element: T): void;
  addAt(element: T, index: number): void;
  indexOf(element: T): number;
  contains(element: T): boolean;
  size(): number;
  toArray(): T[];
  reverse(): void;
  getKthFromTheEnd(k: number): T;
  changeValueByIndex(index: number, value: T): void;
  getValueByIndex(index: number): T;
  getNodeByIndex(index: number): NodeTemp<T> | null;
}
interface INodeTemp<T> {
  next: NodeTemp<T> | null;
  value: T;
}

export default class LinkedList<T> implements ILinkedList<T> {
  public last: NodeTemp<T> | null = null;
  public first: NodeTemp<T> | null = null;
  private _count: number;

  constructor(...items: T[]) {
    this._count = items.length;

    let current: NodeTemp<T> | null = null;

    for (let i: number = 0; i < this._count; i++) {
      let node: NodeTemp<T> = new NodeTemp(items[i]);
      if (i === 0) {
        this.first = node;
        current = this.first;
      } else {
        current!.next = node;
        current = current!.next;
      }
      if (i === this._count - 1) this.last = node;
    }
  }

  // runtime complexity = O(1)
  public removeFirst(): void {
    this._count ? this._count-- : this._count;

    if (this.isEmpty()) throw new Error("there is no item to remove");

    if (this.first === this.last) {
      this.first = null;
      this.last = null;
      return;
    }
    let second: NodeTemp<T> | null = this.first!.next;
    this.first!.next = null;
    this.first = second;
  }
  // runtime complexity = O(n)
  public removeLast(): void {
    this._count ? this._count-- : this._count;

    if (this.isEmpty()) throw new Error("there is no item to remove");

    if (this.first === this.last) {
      this.first = null;
      this.last = null;
      return;
    }

    let previous: NodeTemp<T> | null = this.getPreviousTheLast();
    previous!.next = null;
    this.last = previous;
  }
  // runtime complexity = O(n)
  public removeByIndex(index: number): void {
    this.checkIndex(index);

    if (this.first === this.last) {
      this.first = null;
      this.last = null;
      this._count--;
      return;
    }

    if (index === 0) {
      this.first = this.first!.next;
      this._count--;
      return;
    }

    let previous: NodeTemp<T> | null = this.getPreviousTheIndex(index);
    let current: NodeTemp<T> | null = this.getNodeByIndex(index);
    previous!.next = current!.next;
    if (index === this._count - 1) this.last = previous;
    this._count--;
  }
  // runtime complexity = O(1)
  public addFirst(element: T): void {
    this._count++;

    let node: NodeTemp<T> = new NodeTemp(element);

    if (this.isEmpty()) {
      this.first = node;
      this.last = node;
    } else {
      node.next = this.first;
      this.first = node;
    }
  }
  // runtime complexity = O(1)
  public addLast(element: T): void {
    this._count++;

    let node: NodeTemp<T> = new NodeTemp(element);

    if (this.isEmpty()) {
      this.first = node;
      this.last = node;
    } else {
      this.last!.next = node;
      this.last = node;
    }
  }
  // runtime complexity = O(n)
  public addAt(element: T, index: number): void {
    this._count++;
    this.checkIndex(index);

    if (index === 0) {
      this.addFirst(element);
      this._count--;
      return;
    }
    if (this._count - 1 === index) {
      this.addLast(element);
      this._count--;
      return;
    }

    let node: NodeTemp<T> = new NodeTemp(element);
    let previous: NodeTemp<T> | null = this.getPreviousTheIndex(index);
    let current: NodeTemp<T> | null = this.getNodeByIndex(index);
    node.next = current;
    previous!.next = node;
  }
  // runtime complexity = O(n)
  public indexOf(element: T): number {
    let index: number = 0;
    let current: NodeTemp<T> | null = this.first;
    while (current) {
      if (JSON.stringify(current!.value) === JSON.stringify(element))
        return index;
      current = current.next;
      index++;
    }
    return -1;
  }
  // runtime complexity = O(n)
  public contains(element: T): boolean {
    return this.indexOf(element) !== -1;
  }
  // runtime complexity = O(1) <<with this method>>
  public size(): number {
    return this._count;
  }
  // runtime complexity = O(n)
  public toArray(): T[] {
    let array: T[] = new Array<T>(this._count);
    let current: NodeTemp<T> | null = this.first;
    let index: number = 0;
    while (current) {
      array[index++] = current!.value;
      current = current.next;
    }
    return array;
  }
  // runtime complexity = O(n)
  public reverse(): void {
    let previous: NodeTemp<T> | null = this.first;
    let current: NodeTemp<T> | null = this.first!.next;

    this.last = this.first;
    this.last!.next = null;

    while (current) {
      let next: NodeTemp<T> | null = current!.next;
      current!.next = previous;
      previous = current;
      current = next;
    }
    this.first = previous;
  }
  // runtime complexity = O(n)
  public getKthFromTheEnd(k: number): T {
    if (k <= 0) throw new Error("argument should be an integer more than 0 ");
    if (k !== Math.trunc(k))
      throw new Error(
        `argument should be an integer between 1 to ${this._count} `
      );
    let a: NodeTemp<T> | null = this.first;
    let b: NodeTemp<T> | null = this.first;
    for (let i: number = 0; i < k - 1; i++) {
      b = b!.next;
      if (b === null)
        throw new Error(
          `argument is more than the length of LinkedList, it should be an integer between 1 to ${this._count} `
        );
    }
    while (b !== this.last) {
      a = a!.next;
      b = b!.next;
    }
    return a!.value;
  }
  // runtime complexity = O(n)
  public changeValueByIndex(index: number, value: T): void {
    this.checkIndex(index);

    let a: NodeTemp<T> | null = this.first;
    for (let i: number = 0; i < index; i++) a = a!.next;
    a!.value = value;
  }
  // runtime complexity = O(n)
  public getValueByIndex(index: number): T {
    this.checkIndex(index);

    let a: NodeTemp<T> | null = this.first;
    for (let i: number = 0; i < index; i++) a = a!.next;
    return a!.value;
  }
  // runtime complexity = O(n)
  public getNodeByIndex(index: number): NodeTemp<T> | null {
    this.checkIndex(index);

    let a: NodeTemp<T> | null = this.first;
    for (let i: number = 0; i < index; i++) a = a!.next;
    return a;
  }

  private getPreviousTheIndex(index: number): NodeTemp<T> | null {
    let current: NodeTemp<T> | null = this.first;
    while (current) {
      if (current!.next === this.getNodeByIndex(index)) return current;
      current = current!.next;
    }
    return null;
  }
  private getPreviousTheLast(): NodeTemp<T> | null {
    let current: NodeTemp<T> | null = this.first;
    while (current) {
      if (current!.next === this.last) return current;
      current = current!.next;
    }
    return null;
  }
  private isEmpty(): boolean {
    return this.first === null;
  }
  private checkIndex(index: number): void {
    if (index > this._count - 1)
      throw new Error(
        this._count - 1 <= 0
          ? "index only can be 0"
          : "index is more than the length of LinkedList, it should be an integer between " +
            0 +
            " to " +
            (this._count - 1)
      );
    if (index < 0)
      throw new Error(
        this._count - 1 <= 0
          ? "index only can be 0"
          : "index should be an integer between " +
            0 +
            " to " +
            (this._count - 1)
      );
    if (index !== Math.trunc(index))
      throw new Error(
        "index should be an integer between " + 0 + " to " + (this._count - 1)
      );
  }
}

class NodeTemp<T> implements INodeTemp<T> {
  public next: NodeTemp<T> | null = null;
  constructor(public value: T) {}
}

const newLinkedList: LinkedList<string> = new LinkedList("hello");
