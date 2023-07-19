interface IStack<T> {
  push(item: T): void;
  pop(): T;
  peek(): T;
  isEmpty(): boolean;
}
interface IStringReverser {
  reverse(phrase: string): string;
}
interface IExpression {
  isBalanced(string: string): boolean;
}

// default size = 5
class Stack<T> implements IStack<T> {
  private _items: T[];
  private _count: number = 0;

  constructor(length?: number) {
    this._items = new Array(length || 5);
  }

  // runtime complexity = O(1)
  push(item: T): void {
    if (this._count === this._items.length)
      throw new Error(
        "Stack has reached max capacity, you cannot add more items"
      );
    this._items[this._count++] = item;
  }
  // runtime complexity = O(1)
  pop(): T {
    if (this._count === 0) throw new Error("Stack is empty");
    return this._items[--this._count];
  }
  // runtime complexity = O(1)
  peek(): T {
    if (this._count === 0) throw new Error("Stack is empty");
    return this._items[this._count - 1];
  }
  // runtime complexity = O(1)
  isEmpty(): boolean {
    return this._count === 0;
  }
}

const newStack: Stack<string> = new Stack();

// string revresing
class StringReverser implements IStringReverser {
  public reverse(phrase: string): string {
    let stack: Stack<string> = new Stack(20);
    phrase.split("").forEach((cha) => stack.push(cha));
    let reverse: string = "";
    while (!stack.isEmpty()) reverse += stack.pop();
    return reverse;
  }
}

const stringReverser: StringReverser = new StringReverser();
stringReverser.reverse("hello");

// balanced expression
class Expression implements IExpression {
  private _leftMarks: string[] = ["[", "<", "{", "("];
  private _rightMarks: string[] = ["]", ">", "}", ")"];

  public isBalanced(string: string): boolean {
    let charArray: string[] = string.split("");
    let stack: Stack<string> = new Stack(30);
    for (let i: number = 0; i < charArray.length; i++) {
      if (this.isLeftMark(charArray[i])) stack.push(charArray[i]);
      if (this.isRightMark(charArray[i])) {
        if (stack.isEmpty()) return false;
        let top: string = stack.pop()!.toString();
        if (!this.marksMatch(top, charArray[i])) return false;
      }
    }
    return stack.isEmpty();
  }

  private isLeftMark(cha: string): boolean {
    return this._leftMarks.includes(cha);
  }
  private isRightMark(cha: string): boolean {
    return this._rightMarks.includes(cha);
  }
  private marksMatch(left: string, right: string): boolean {
    return this._leftMarks.indexOf(left) === this._rightMarks.indexOf(right);
  }
}

const expression: Expression = new Expression();
expression.isBalanced("<<{{((([[[hello]]])))}}>>");
