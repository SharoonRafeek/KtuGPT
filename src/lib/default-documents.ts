// Pre-processed document chunks to avoid PDF loading in production
export const DEFAULT_DS_DOCUMENTS = [
  {
    pageContent:
      "A stack is a linear data structure that follows the Last In First Out (LIFO) principle. Elements are added and removed from the same end, called the top of the stack. Common operations include push (add element), pop (remove element), and peek (view top element without removing). Stacks are used in function calls, expression evaluation, and undo operations. Push is the term used to insert an element into a stack. Pop is the term used to delete an element from the stack. All insertions and deletions take place at the same end, so the last element added to the stack will be the first element removed from the stack.",
    metadata: { source: "ds-notes", page: 1, topic: "stack" },
  },
  {
    pageContent:
      "A queue is a linear data structure that follows the First In First Out (FIFO) principle. Elements are added at the rear (enqueue) and removed from the front (dequeue). It's like a line of people waiting - first person in line gets served first. Queues are used in breadth-first search, task scheduling, and buffering. To remove a new element inserted into the Queue, all elements inserted before it must first be removed. The peek() function is often used to return the value of the first element in the queue without deleting it.",
    metadata: { source: "ds-notes", page: 2, topic: "queue" },
  },
  {
    pageContent:
      "Arrays are data structures that store elements in contiguous memory locations. They provide constant time O(1) access to elements using indices. Arrays have fixed size in many programming languages. Random access is their main advantage, but insertion and deletion can be expensive O(n) operations. Array elements are stored in consecutive memory locations and can be accessed using array indices.",
    metadata: { source: "ds-notes", page: 3, topic: "array" },
  },
  {
    pageContent:
      "Linked lists are dynamic data structures where elements (nodes) are stored in sequence, but not necessarily in contiguous memory. Each node contains data and a pointer to the next node. Types include singly linked, doubly linked, and circular linked lists. They allow efficient insertion and deletion but require O(n) time for search. Unlike arrays, linked lists can grow or shrink during runtime.",
    metadata: { source: "ds-notes", page: 4, topic: "linked-list" },
  },
  {
    pageContent:
      "Binary trees are hierarchical data structures where each node has at most two children, referred to as left and right child. Tree traversal methods include inorder, preorder, and postorder. Binary search trees maintain a sorted order where left children are smaller and right children are larger than the parent. Trees are used in many applications including file systems, databases, and expression parsing.",
    metadata: { source: "ds-notes", page: 5, topic: "binary-tree" },
  },
  {
    pageContent:
      "Hash tables (hash maps) provide average O(1) time complexity for search, insertion, and deletion operations. They use a hash function to compute an index into an array of buckets. Collision resolution techniques include chaining and open addressing. Hash tables are widely used in database indexing and caching. The hash function distributes keys uniformly across the hash table.",
    metadata: { source: "ds-notes", page: 6, topic: "hash-table" },
  },
  {
    pageContent:
      "Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing the search interval in half. Binary search compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated and the search continues on the remaining half. Time complexity is O(log n).",
    metadata: { source: "algorithms", page: 1, topic: "binary-search" },
  },
  {
    pageContent:
      "Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order. It has O(n²) time complexity in worst and average cases. Despite being inefficient for large datasets, it's educational and has O(1) space complexity. The algorithm gets its name because smaller elements bubble to the top of the list.",
    metadata: { source: "algorithms", page: 2, topic: "bubble-sort" },
  },
  {
    pageContent:
      "Quick sort is an efficient divide-and-conquer sorting algorithm. It picks a pivot element and partitions the array around it, then recursively sorts the sub-arrays. Average time complexity is O(n log n), but worst case is O(n²). It's widely used due to its practical efficiency and in-place sorting capability. The choice of pivot selection strategy affects performance.",
    metadata: { source: "algorithms", page: 3, topic: "quick-sort" },
  },
  {
    pageContent:
      "Merge sort is a stable, divide-and-conquer sorting algorithm. It divides the input array into two halves, recursively sorts them, and then merges the sorted halves. Time complexity is consistently O(n log n) for all cases. Space complexity is O(n) due to the temporary arrays used in merging. Merge sort is preferred when stable sorting is required.",
    metadata: { source: "algorithms", page: 4, topic: "merge-sort" },
  },
];
