interface ITree {
  insert(item: number): void;
  find(item: number): boolean;
  traversePreOrder(func: (value: number) => void): void;
  traverseInOrder(func: (value: number) => void): void;
  traversePostOrder(func: (value: number) => void): void;
  traverseLevelOrder(func: (value: number) => void): void;
  height(): number;
  minInBSTWithRecursion(): number;
  minInBSTWithLoop(): number;
  minInBT(): number;
  equals(other: Tree): boolean;
  printNodeAtDistance(distance: number): void;
}
interface INodeTemp {
  rightChild: NodeTemp | null;
  leftChild: NodeTemp | null;
}

class Tree implements ITree {
  private _root: NodeTemp | null = null;

  // runtime complexity : O(log n)
  public insert(item: number): void {
    let node: NodeTemp = new NodeTemp(item);
    if (!this._root) {
      this._root = node;
      return;
    }
    let current: NodeTemp = this._root;
    while (true) {
      if (current!.value === item) throw new Error("this item already exists");
      if (current!.value < item) {
        if (current!.rightChild === null) {
          current!.rightChild = node;
          break;
        }
        current = current!.rightChild;
      } else {
        if (current!.leftChild === null) {
          current!.leftChild = node;
          break;
        }
        current = current!.leftChild;
      }
    }
  }
  // runtime complexity : O(log n)
  public find(item: number): boolean {
    let current: NodeTemp | null = this._root;
    while (current) {
      if (current!.value < item) {
        current = current!.rightChild;
      } else if (current!.value > item) {
        current = current!.leftChild;
      } else return true;
    }
    return false;
  }
  // runtime complexity : O(n)
  public traversePreOrder(func: (value: number) => void): void {
    if (!this._root) throw new Error("tree is empty");
    this.pTraversePreOrder(this._root, func);
  }
  // runtime complexity : O(n)
  public traverseInOrder(func: (value: number) => void): void {
    if (!this._root) throw new Error("tree is empty");
    this.pTraverseInOrder(this._root, func);
  }
  // runtime complexity : O(n)
  public traversePostOrder(func: (value: number) => void): void {
    if (!this._root) throw new Error("tree is empty");
    this.pTraversePostOrder(this._root, func);
  }
  // runtime complexity : O(n^2)
  public traverseLevelOrder(func: (value: number) => void): void {
    if (!this._root) throw new Error("tree is empty");
    for (let i: number = 0; i <= this.height(); i++) {
      this.nodesAtDistance(i, func);
    }
  }
  // runtime complexity : O(n)
  public height(): number {
    if (!this._root) throw new Error("tree is empty");
    return this.pHeight(this._root);
  }
  // runtime complexity : O(log n)
  public minInBSTWithRecursion(): number {
    if (!this._root) throw new Error("tree is empty");
    return this.pMinInBSTWithRecursion(this._root);
  }
  // runtime complexity : O(log n)
  public minInBSTWithLoop(): number {
    if (!this._root) throw new Error("tree is empty");
    let current: NodeTemp | null = this._root;
    let last: NodeTemp | null = null;
    while (current) {
      last = current;
      current = current!.leftChild;
    }
    return last!.value;
  }
  // runtime complexity : O(n)
  public minInBT(): number {
    if (!this._root) throw new Error("tree is empty");
    return this.pMinInBT(this._root);
  }
  // runtime complexity : O(n)
  public equals(other: Tree): boolean {
    return this.pEquals(this._root, other._root);
  }
  // runtime complexity : O(n)
  public printNodeAtDistance(distance: number): void {
    if (!this._root) throw new Error("tree is empty");
    this.pPrintNodeAtDistance(distance, this._root);
  }
  // runtime complexity : O(n)
  private nodesAtDistance(
    distance: number,
    func: (value: number) => void
  ): void {
    if (!this._root) throw new Error("tree is empty");
    this.pNodeAtDistance(distance, this._root, func);
  }
  // runtime complexity : O(n)
  public static isBinarySearchTree(tree: Tree): boolean {
    if (!tree._root) throw new Error("tree is empty");
    return this.pIsBinarySearchTree(tree._root, Math.max(), Math.min());
  }

  private pTraversePreOrder(
    node: NodeTemp | null,
    func: (value: number) => void
  ): void {
    if (node === null) return;
    func(node.value);
    this.pTraversePreOrder(node.leftChild, func);
    this.pTraversePreOrder(node.rightChild, func);
  }
  private pTraverseInOrder(
    node: NodeTemp | null,
    func: (value: number) => void
  ): void {
    if (node === null) return;
    this.pTraverseInOrder(node.leftChild, func);
    func(node.value);
    this.pTraverseInOrder(node.rightChild, func);
  }
  private pTraversePostOrder(
    node: NodeTemp | null,
    func: (value: number) => void
  ): void {
    if (node === null) return;
    this.pTraversePostOrder(node.leftChild, func);
    this.pTraversePostOrder(node.rightChild, func);
    func(node.value);
  }
  private pHeight(node: NodeTemp | null): number {
    if (!node) return 0;
    if (!node!.leftChild && !node!.rightChild) return 0;
    return (
      1 +
      Math.max(this.pHeight(node!.leftChild), this.pHeight(node!.rightChild))
    );
  }
  private pMinInBSTWithRecursion(node: NodeTemp | null): number {
    if (!node!.leftChild) return node!.value;
    return this.pMinInBSTWithRecursion(node!.leftChild);
  }
  private pMinInBT(node: NodeTemp | null): number {
    if (!node!.leftChild && !node!.rightChild) {
      return node!.value;
    } else if (!node!.leftChild) {
      return Math.min(node!.value, this.pMinInBT(node!.rightChild));
    } else if (!node!.rightChild) {
      return Math.min(node!.value, this.pMinInBT(node!.leftChild));
    } else {
      return Math.min(
        node!.value,
        this.pMinInBT(node!.leftChild),
        this.pMinInBT(node!.rightChild)
      );
    }
  }
  private pEquals(first: NodeTemp | null, second: NodeTemp | null): boolean {
    if (!first && !second) return true;
    if (!first || !second || first!.value !== second!.value) return false;
    return (
      this.pEquals(first!.leftChild, second!.leftChild) &&
      this.pEquals(first!.rightChild, second!.rightChild)
    );
  }
  private pPrintNodeAtDistance(distance: number, node: NodeTemp | null): void {
    if (!node) return;
    if (distance === 0) {
      console.log(node.value);
      return;
    }
    this.pPrintNodeAtDistance(distance - 1, node.leftChild);
    this.pPrintNodeAtDistance(distance - 1, node.rightChild);
  }
  private pNodeAtDistance(
    distance: number,
    node: NodeTemp | null,
    func: (value: number) => void
  ): void {
    if (!node) return;
    if (distance === 0) {
      func(node.value);
      return;
    }
    this.pNodeAtDistance(distance - 1, node.leftChild, func);
    this.pNodeAtDistance(distance - 1, node.rightChild, func);
  }
  private static pIsBinarySearchTree(
    node: NodeTemp | null,
    min: number,
    max: number
  ): boolean {
    if (!node) return true;
    if (node!.value <= min || node!.value >= max) return false;
    return (
      this.pIsBinarySearchTree(node!.leftChild, min, node!.value) &&
      this.pIsBinarySearchTree(node!.rightChild, node!.value, max)
    );
  }

  // factorial => loop
  public static loopFactorial(num: number): number {
    if (num !== Math.trunc(num)) throw new Error("input should be an integer");
    let factorial: number = 1;
    for (let i: number = num; i > 1; i--) factorial *= i;
    return factorial;
  }
  // factorial => recursion
  public static recurFactorial(num: number): number {
    if (num !== Math.trunc(num)) throw new Error("input should be an integer");
    if (num === 1) return 1;
    return num * this.recurFactorial(num - 1);
  }
}
class NodeTemp implements INodeTemp {
  public rightChild: NodeTemp | null = null;
  public leftChild: NodeTemp | null = null;
  constructor(public value: number) {}
}

const tree: Tree = new Tree();

tree.insert(7);
tree.insert(4);
tree.insert(9);
tree.insert(1);
tree.insert(6);
tree.insert(8);
tree.insert(10);

tree.traversePreOrder((value) => {
  console.log(value);
});
tree.traverseInOrder((value) => {
  console.log(value);
});
tree.traversePostOrder((value) => {
  console.log(value);
});
tree.traverseLevelOrder((value) => {
  console.log(value);
});
