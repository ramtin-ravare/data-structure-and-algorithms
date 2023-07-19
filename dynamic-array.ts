interface IDynamicArray<T> {
  array: T[];
  insert(element: T): void;
  removeAt(index: number): void;
  indexOf(element: T): number;
  print(): void;
}

class DynamicArray<T> implements IDynamicArray<T> {
  public array: T[] = new Array<T>();
  private _count: number = 0;

  constructor(length: number, ...items: T[]) {
    this.array.length = length;
    this._count = items.length;
    if (items.length <= length) {
      for (let i: number = 0; i < items.length; i++) {
        this.array[i] = items[i];
      }
    }
    if (items.length > length)
      throw new Error(
        "the number of elements is more than " + length + " character"
      );
  }

  // runtime complexity = O(n)
  public insert(element: T): void {
    if (this.array.length === this._count) {
      let newArray: T[] = new Array(this.array.length * 2);
      for (let i: number = 0; i < this._count; i++) {
        newArray[i] = this.array[i];
      }
      this.array = newArray;
    }
    this.array[this._count] = element;
    this._count++;
  }
  // runtime complexity = O(n)
  public removeAt(index: number): void {
    if (index >= this._count || index < 0)
      throw new Error("the index should be between 0 to " + (this._count - 1));
    for (let i: number = index; i < this._count; i++) {
      this.array[i] = this.array[i + 1];
    }
    this._count--;
  }
  // runtime complexity = O(n)
  public indexOf(element: T): number {
    for (let i: number = 0; i < this._count; i++) {
      if (this.array[i] === element) return i;
    }
    return -1;
  }
  // runtime complexity = O(n)
  public print(): void {
    for (let i: number = 0; i < this._count; i++) {
      console.log(this.array[i]);
    }
  }
}

const newArray: DynamicArray<string> = new DynamicArray(3);
