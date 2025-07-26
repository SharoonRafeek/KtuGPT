import { config } from "dotenv";
config({ path: ".env.local" });

import { Document } from "langchain/document";
import { embedAndStoreDocs, searchSimilarDocs } from "./src/lib/simple-vector-store.ts";

// Simple test documents about data structures
const testDocs = [
    new Document({
        pageContent: "A stack is a linear data structure that follows the Last In First Out (LIFO) principle. Elements are added and removed from the same end, called the top of the stack. Common operations include push (add element), pop (remove element), and peek (view top element).",
        metadata: { source: "test", page: 1 }
    }),
    new Document({
        pageContent: "A queue is a linear data structure that follows the First In First Out (FIFO) principle. Elements are added at the rear (enqueue) and removed from the front (dequeue). It's like a line of people waiting - first person in line gets served first.",
        metadata: { source: "test", page: 2 }
    }),
    new Document({
        pageContent: "Arrays are data structures that store elements in contiguous memory locations. They provide constant time access to elements using indices. Arrays have fixed size in many programming languages.",
        metadata: { source: "test", page: 3 }
    }),
    new Document({
        pageContent: "Linked lists are dynamic data structures where elements (nodes) are stored in sequence, but not necessarily in contiguous memory. Each node contains data and a pointer to the next node.",
        metadata: { source: "test", page: 4 }
    })
];

// Test the vector store functionality
(async () => {
    try {
        console.log("Testing vector store with sample documents...");
        await embedAndStoreDocs(testDocs);
        console.log("Successfully stored test documents!");

        // Test search functionality
        console.log("\nTesting search functionality...");
        const searchResults = await searchSimilarDocs("What is a stack?", 2);
        console.log(`Found ${searchResults.length} results for "What is a stack?"`);
        searchResults.forEach((doc, i) => {
            console.log(`Result ${i + 1}: ${doc.pageContent.substring(0, 100)}...`);
        });

    } catch (error) {
        console.error("Test failed:", error);
    }
})();
