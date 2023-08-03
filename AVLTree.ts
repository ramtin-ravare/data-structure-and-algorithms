interface IAVLTree {
  find(value: number): boolean;
  delete(value: number): void;
  insert(value: number): void;
}
interface IAVLNode {
  leftChild: AVLNode | null;
  rightChild: AVLNode | null;
  height: number;
  value: number;
}

class AVLTree implements IAVLTree {
  private _root: AVLNode | null = null;

  // runtime complexity = O(log n);
  public find(value: number): boolean {
    return this.pFind(value, this._root);
  }
  // runtime complexity = O(log n);
  public delete(value: number): void {
    this._root = this.pDelete(value, this._root);
  }
  // runtime complexity = O(log n);
  public insert(value: number): void {
    this._root = this.pInsert(value, this._root);
  }

  private pFind(value: number, node: AVLNode | null): boolean {
    if (!node) return false;
    if (node.value === value) return true;
    if (node.value > value) return this.pFind(value, node.leftChild);
    else return this.pFind(value, node.rightChild);
  }
  private pDelete(value: number, node: AVLNode | null): AVLNode | null {
    if (!node) throw new Error("this item dosen't exist");
    if (node.value === value) return this.removeItem(node);
    if (node!.value > value)
      node.leftChild = this.pDelete(value, node!.leftChild);
    else node.rightChild = this.pDelete(value, node!.rightChild);
    this.setHeight(node);
    return this.balance(node);
  }
  private pInsert(value: number, node: AVLNode | null): AVLNode {
    if (!node) return new AVLNode(value);
    if (node.value === value) throw new Error("this item already exists");
    if (node.value > value)
      node.leftChild = this.pInsert(value, node.leftChild);
    else node.rightChild = this.pInsert(value, node.rightChild);
    this.setHeight(node);
    return this.balance(node);
  }

  private removeItem(node: AVLNode | null): AVLNode | null {
    if (!node!.leftChild && !node!.rightChild) return null;
    else if (node!.leftChild && !node!.rightChild) return node!.leftChild;
    else if (node!.rightChild && !node!.leftChild) return node!.rightChild;
    else {
      let newRootValue: number = this.leftGreatest(node!.leftChild);
      node = this.pDelete(newRootValue, node);
      node!.value = newRootValue;
      return node;
    }
  }
  private leftGreatest(node: AVLNode | null): number {
    if (!node!.rightChild) return node!.value;
    return this.leftGreatest(node!.rightChild);
  }
  private balance(node: AVLNode): AVLNode {
    if (this.isRightHeavy(node)) {
      if (this.balanceFactor(node.rightChild) > 0 && node.rightChild)
        node.rightChild = this.rotateRight(node.rightChild);
      node = this.rotateLeft(node);
    }
    if (this.isLeftHeavy(node)) {
      if (this.balanceFactor(node.leftChild) < 0 && node.leftChild)
        node.leftChild = this.rotateLeft(node.leftChild);
      node = this.rotateRight(node);
    }
    return node;
  }
  private rotateLeft(root: AVLNode): AVLNode {
    let newRoot: AVLNode = new AVLNode(0);

    if (root.rightChild) {
      newRoot = root.rightChild;
      root.rightChild = newRoot.leftChild;
      newRoot.leftChild = root;
      this.setHeight(root);
      this.setHeight(newRoot);
    }

    return newRoot;
  }
  private rotateRight(root: AVLNode): AVLNode {
    let newRoot: AVLNode = new AVLNode(0);

    if (root.leftChild) {
      newRoot = root.leftChild;
      root.leftChild = newRoot.rightChild;
      newRoot.rightChild = root;
      this.setHeight(root);
      this.setHeight(newRoot);
    }
    return newRoot;
  }
  private setHeight(node: AVLNode): void {
    node.height =
      Math.max(this.height(node.leftChild), this.height(node.rightChild)) + 1;
  }
  private height(node: AVLNode | null): number {
    return node ? node.height : -1;
  }
  private isLeftHeavy(node: AVLNode): boolean {
    return this.balanceFactor(node) > 1;
  }
  private isRightHeavy(node: AVLNode): boolean {
    return this.balanceFactor(node) < -1;
  }
  private balanceFactor(node: AVLNode | null): number {
    return node
      ? this.height(node.leftChild) - this.height(node.rightChild)
      : -1;
  }
}
class AVLNode implements IAVLNode {
  public rightChild: AVLNode | null = null;
  public leftChild: AVLNode | null = null;
  public height: number = 0;
  constructor(public value: number) {}
}

const newAVLTree: AVLTree = new AVLTree();
