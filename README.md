# data-structure-and-algorithms

in this repopsitory i will push my training about data structure and algorithms. training projects built by typescript, also i have tried to avoid using native methods and some features which is belong to typescript and javascript :)

# dynamic-array

in this file dynamic Array data structure implemented with typescript, altough typescript support this concept by default but i assumed that this is a totally new concept and i implemented that from scratch

# linked-list

in this file LinkedList data structure implemented with typescript, altough in typescript and js we don't have this concept but i implemented that and its various methods step by step

# stack

in stack.ts file, Stack data structure implemented, also by using this data structure and its feature, i implemented a class which has a method that reversing any string, in the following we can see class Expression, in this class exists "isBalanced" method, this method receive a string and validate every open marks in the string (like: "<", "(", ...) to have their corresponding close marks

# queue

in queue.ts file, Queue data structure implemented by using different data structures like Array and Stack; also PriorityQueue is an abstraction implementation of queue concept which is receives numbers and organize these numbers in ascending order; finally there is a practice for reversing ArrayQueue and QueueWithTwoStacks

# hash-table

in hash-table.ts file, HashTable data structure implemented which is accept number keys and string values, chaining technique has used for resolving collisions, in the following, CharFinder class has 2 static methods for finding first repetitive and non-repetitve characters of a string, findFirstNonRepetitiveChar method is using Map class (which is a native javascript implementation for HashTable data structure) for finding first non-repetitive character, findFirstRepetitiveChar method is using Set class (which is a native javascript implementation for Set data structure) for finding first repetitive character.

# tree

Tree data structure has various types and Tree class in tree.ts file, is a simple implementation of Binary Search Tree (BST), this class has 2 methods to insert and find nodes, BST major advantage is O(log n) runtime complexity for its different operations (like insert, find, remove) (actually if the tree is in balance situation), in the following, different methods have implemented for traversing BST in level order, preorder, inorder and postorder ways, and finally there is some helper methods for calculating the tree height, equality examination of 2 trees and finding the minimum amount in the tree, except find and insert methods, other methods are using recursion technique to traverse nodes.

# AVLTree

as you know, if BST is in balance situation, we'll see O(log n) runtime complexity for its different operations (like insert, find, remove), so avl-tree does the same thing and for every insert and remove operation, balances the tree for runtime optimizations, balancing is a long discussion but in summary, for every node, avl-tree calculates left node height and right node height substraction then checks this value and it should be between -1 to 1, otherwise by some certain actions like left rotation (LLR), right rotation (RRR), left right rotaion (LRR) and right left rotation (RLR), nodes starts to balance, there is 3 vital methods in this class, insert method has responsibility for adding an item, find indicates existance a item by returning a boolean value and finally, remove method has responsibility for removing an item from the avl-tree, also all methods have implemented by recursion technique.
