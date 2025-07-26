import { config } from "dotenv";
config({ path: ".env.local" });

import { Document } from "langchain/document";
import { embedAndStoreDocs } from "./src/lib/simple-vector-store.ts";

// Comprehensive DS&A test documents
const testDocs = [
    new Document({
        pageContent: "A stack is a linear data structure that follows the Last In First Out (LIFO) principle. Elements are added and removed from the same end, called the top of the stack. Common operations include push (add element), pop (remove element), and peek (view top element without removing). Stacks are used in function calls, expression evaluation, and undo operations.",
        metadata: { source: "ds-notes", page: 1, topic: "stack" }
    }),
    new Document({
        pageContent: "A queue is a linear data structure that follows the First In First Out (FIFO) principle. Elements are added at the rear (enqueue) and removed from the front (dequeue). It's like a line of people waiting - first person in line gets served first. Queues are used in breadth-first search, task scheduling, and buffering.",
        metadata: { source: "ds-notes", page: 2, topic: "queue" }
    }),
    new Document({
        pageContent: "Arrays are data structures that store elements in contiguous memory locations. They provide constant time O(1) access to elements using indices. Arrays have fixed size in many programming languages. Random access is their main advantage, but insertion and deletion can be expensive O(n) operations.",
        metadata: { source: "ds-notes", page: 3, topic: "array" }
    }),
    new Document({
        pageContent: "Linked lists are dynamic data structures where elements (nodes) are stored in sequence, but not necessarily in contiguous memory. Each node contains data and a pointer to the next node. Types include singly linked, doubly linked, and circular linked lists. They allow efficient insertion and deletion but require O(n) time for search.",
        metadata: { source: "ds-notes", page: 4, topic: "linked-list" }
    }),
    new Document({
        pageContent: "Binary trees are hierarchical data structures where each node has at most two children, referred to as left and right child. Tree traversal methods include inorder, preorder, and postorder. Binary search trees maintain a sorted order where left children are smaller and right children are larger than the parent.",
        metadata: { source: "ds-notes", page: 5, topic: "binary-tree" }
    }),
    new Document({
        pageContent: "Hash tables (hash maps) provide average O(1) time complexity for search, insertion, and deletion operations. They use a hash function to compute an index into an array of buckets. Collision resolution techniques include chaining and open addressing. Hash tables are widely used in database indexing and caching.",
        metadata: { source: "ds-notes", page: 6, topic: "hash-table" }
    }),
    new Document({
        pageContent: "Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order. It has O(n²) time complexity in worst and average cases. Despite being inefficient for large datasets, it's educational and has O(1) space complexity.",
        metadata: { source: "algorithms", page: 1, topic: "sorting" }
    }),
    new Document({
        pageContent: "Quick sort is an efficient divide-and-conquer sorting algorithm. It picks a pivot element and partitions the array around it, then recursively sorts the sub-arrays. Average time complexity is O(n log n), but worst case is O(n²). It's widely used due to its practical efficiency and in-place sorting capability.",
        metadata: { source: "algorithms", page: 2, topic: "sorting" }
    })
];

// Test the complete system
(async () => {
    try {
        console.log("Setting up KtuGPT with comprehensive test data...");
        console.log(`Loading ${testDocs.length} documents...`);

        await embedAndStoreDocs(testDocs);

        console.log("✅ Successfully loaded all documents!");
        console.log("\n🔍 Testing search queries...");

        // Test different types of queries
        const testQueries = [
            "What is a stack?",
            "How does a queue work?",
            "Tell me about sorting algorithms",
            "What is the time complexity of hash tables?",
            "Explain binary trees"
        ];

        for (const query of testQueries) {
            console.log(`\n📝 Query: "${query}"`);

            // Test the API endpoint by making an HTTP request
            try {
                const response = await fetch('http://localhost:3001/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        messages: [
                            { role: 'user', content: query }
                        ]
                    })
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log(`✅ Response: ${result.content.substring(0, 200)}...`);
                    console.log(`📚 Sources found: ${result.sources?.length || 0}`);
                } else {
                    console.log(`❌ API Error: ${response.status}`);
                }
            } catch (apiError) {
                console.log(`❌ Failed to test API: ${apiError.message}`);
                console.log("💡 Make sure the development server is running on port 3001");
            }
        }

        console.log("\n🎉 Test completed! The system is ready to use.");
        console.log("💻 Visit http://localhost:3001 to use the chat interface");

    } catch (error) {
        console.error("❌ Test failed:", error);
    }
})();
