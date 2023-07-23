import Stack from "./stack";

interface IQueue<T> {
  enqueue(item: T): void;
  dequeue(): T;
  peek(): T;
  isFull(): boolean;
  isEmpty(): boolean;
  get capacity(): number;
}

// Queue implementation with Array
class ArrayQueue<T> implements IQueue<T> {
  private _items: T[];
  private _front: number = 0;
  private _rear: number = 0;
  private _count: number = 0;

  constructor(private _capacity: number = 5) {
    this._items = new Array<T>(this._capacity);
  }

  // runtime complexity = O(1)
  enqueue(item: T): void {
    if (this._count === this._capacity)
      throw new Error("the queue has no more capacity to add item");
    this._items[this._rear] = item;
    this._rear = (this._rear + 1) % this._capacity;
    this._count++;
  }
  // runtime complexity = O(1)
  dequeue(): T {
    if (this._count === 0) throw new Error("the queue is empty");
    const frontElement: T = this._items[this._front];
    this._front = (this._front + 1) % this._capacity;
    this._count--;
    return frontElement;
  }
  // runtime complexity = O(1)
  peek(): T {
    if (this._count === 0) throw new Error("the queue is empty");
    return this._items[this._front];
  }
  // runtime complexity = O(1)
  isFull(): boolean {
    if (this._count === this._capacity) return true;
    return false;
  }
  // runtime complexity = O(1)
  isEmpty(): boolean {
    if (this._count > 0) return false;
    return true;
  }
  get capacity(): number {
    return this._capacity;
  }
}
// Queue implementation with Stack
class QueueWithTwoStacks<T> implements IQueue<T> {
  private _stack1: Stack<T>;
  private _stack2: Stack<T>;
  private _count: number = 0;
  constructor(private _capacity: number = 5) {
    this._stack1 = new Stack<T>(this._capacity);
    this._stack2 = new Stack<T>(this._capacity);
  }
  // runtime complexity : O(1)
  enqueue(item: T): void {
    if (this.isFull())
      throw new Error("the queue has no more capacity to add item");
    this._stack1.push(item);
    this._count++;
  }
  // runtime complexity : O(n)
  dequeue(): T {
    if (this.isEmpty()) throw new Error("the queue is empty");
    if (this._stack2.isEmpty())
      while (!this._stack1.isEmpty()) this._stack2.push(this._stack1.pop());
    this._count--;
    return this._stack2.pop();
  }
  peek(): T {
    if (this.isEmpty()) throw new Error("the queue is empty");
    if (this._stack2.isEmpty())
      while (!this._stack1.isEmpty()) this._stack2.push(this._stack1.pop());
    return this._stack2.peek();
  }
  isFull(): boolean {
    return this._count === this._capacity;
  }
  isEmpty(): boolean {
    return this._stack1.isEmpty() && this._stack2.isEmpty();
  }
  get capacity(): number {
    return this._capacity;
  }
}
// this Queue receives numbers and organize these numbers in ascending order
class PriorityQueue implements IQueue<number> {
  private _items: number[];
  private _count: number = 0;

  constructor(private _capacity: number = 5) {
    this._items = new Array<number>(_capacity);
  }
  enqueue(item: number): void {
    if (this.isFull())
      throw new Error("the queue has no more capacity to add item");
    let i: number;
    for (i = this._count - 1; 0 <= i; i--) {
      if (this._items[i] < item) this._items[i + 1] = this._items[i];
      else break;
    }
    this._items[i + 1] = item;
    this._count++;
  }
  dequeue(): number {
    if (this.isEmpty()) throw new Error("the queue is empty");
    return this._items[--this._count];
  }
  peek(): number {
    if (this.isEmpty()) throw new Error("the queue is empty");
    return this._items[this._count - 1];
  }
  isFull(): boolean {
    return this._count === this._capacity;
  }
  isEmpty(): boolean {
    return this._count === 0;
  }
  get capacity(): number {
    return this._capacity;
  }
}
// queue reversing - guide : "reverse()" is a static method and receive a queue as input
class QueueReverser {
  static reverse<T>(queue: ArrayQueue<T> | QueueWithTwoStacks<T>): void {
    let stack: Stack<any> = new Stack(queue.capacity);
    while (!queue.isEmpty()) stack.push(queue.dequeue());
    while (!stack.isEmpty()) queue.enqueue(stack.pop());
  }
}

// default capacity = 5;
const newArrayQueue: ArrayQueue<number> = new ArrayQueue();

// default capacity = 5;
const newQueueWithTwoStacks: QueueWithTwoStacks<number> =
  new QueueWithTwoStacks();

// default capacity = 5;
const newPriorityQueue: PriorityQueue = new PriorityQueue();
