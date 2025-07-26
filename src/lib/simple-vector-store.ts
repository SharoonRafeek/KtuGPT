import { Document } from "langchain/document";
import { getChunkedDocsFromPDF } from "./pdf-loader";

// Simple in-memory vector store
class InMemoryVectorStore {
  private documents: { doc: Document; embedding: number[] }[] = [];
  private isInitialized = false;

  // Simple text-based similarity using TF-IDF-like approach
  private simpleEmbedding(text: string): number[] {
    // Create a simple embedding based on character frequencies and word patterns
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const embedding = new Array(384).fill(0); // 384-dimensional vector

    // Basic feature extraction
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      for (let j = 0; j < word.length && j < 100; j++) {
        const charCode = word.charCodeAt(j);
        const index = (charCode + j + i) % 384;
        embedding[index] += 1 / (j + 1); // Positional weighting
      }
    }

    // Add text length and common DS&A keywords with higher weight
    const dsKeywords = [
      "stack",
      "stacks",
      "queue",
      "queues",
      "array",
      "arrays",
      "tree",
      "trees",
      "graph",
      "graphs",
      "algorithm",
      "algorithms",
      "data",
      "structure",
      "structures",
      "sort",
      "sorting",
      "search",
      "searching",
      "binary",
      "heap",
      "hash",
      "linked",
      "list",
      "lists",
      "pointer",
      "pointers",
      "recursion",
      "recursive",
      "iteration",
      "iterative",
      "complexity",
      "time",
      "space",
      "big",
      "lifo",
      "fifo",
      "push",
      "pop",
      "peek",
      "top",
      "enqueue",
      "dequeue",
      "front",
      "rear",
    ];

    // Much higher weight for exact keyword matches
    dsKeywords.forEach((keyword, idx) => {
      const keywordCount = (
        text.toLowerCase().match(new RegExp(`\\b${keyword}\\b`, "g")) || []
      ).length;
      if (keywordCount > 0) {
        const index = (idx * 13) % 384;
        embedding[index] += keywordCount * 5; // Much higher boost for exact matches
      }
    });

    // Add some basic text statistics
    const textLength = text.length;
    const wordCount = words.length;
    embedding[380] = textLength / 1000; // Normalize text length
    embedding[381] = wordCount / 100; // Normalize word count

    // Normalize the embedding vector
    const norm = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return norm > 0 ? embedding.map((val) => val / norm) : embedding;
  }

  // Calculate cosine similarity between two vectors
  private cosineSimilarity(a: number[], b: number[]): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }

    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);

    if (normA === 0 || normB === 0) {
      return 0;
    }

    return dotProduct / (normA * normB);
  }

  // Add documents to the store
  async embedAndStoreDocs(documents: Document[]): Promise<void> {
    try {
      console.log(`Storing ${documents.length} documents in memory...`);

      for (const doc of documents) {
        const embedding = this.simpleEmbedding(doc.pageContent);
        this.documents.push({ doc, embedding });
      }

      this.isInitialized = true;
      console.log(
        `Successfully stored ${documents.length} documents! Total: ${this.documents.length}`
      );
    } catch (error) {
      console.error("Error storing documents:", error);
      throw new Error("Failed to store documents");
    }
  }

  // Check if store has documents
  hasDocuments(): boolean {
    return this.documents.length > 0;
  }

  // Initialize with default documents if empty
  async initializeWithDefaults(): Promise<void> {
    if (this.isInitialized) return;

    console.log("Initializing vector store with PDF documents...");

    try {
      // Try to load from PDF first
      const pdfDocs = await getChunkedDocsFromPDF();
      console.log(`Successfully loaded ${pdfDocs.length} chunks from PDF`);
      await this.embedAndStoreDocs(pdfDocs);
      return;
    } catch (pdfError) {
      console.error("Failed to load PDF, falling back to default docs:", pdfError);
    }

    // Fallback to default documents if PDF loading fails
    const defaultDocs = [
      new Document({
        pageContent:
          "A stack is a linear data structure that follows the Last In First Out (LIFO) principle. Elements are added and removed from the same end, called the top of the stack. Common operations include push (add element), pop (remove element), and peek (view top element without removing). Stacks are used in function calls, expression evaluation, and undo operations.",
        metadata: { source: "default", topic: "stack" },
      }),
      new Document({
        pageContent:
          "A queue is a linear data structure that follows the First In First Out (FIFO) principle. Elements are added at the rear (enqueue) and removed from the front (dequeue). It's like a line of people waiting - first person in line gets served first. Queues are used in breadth-first search, task scheduling, and buffering.",
        metadata: { source: "default", topic: "queue" },
      }),
      new Document({
        pageContent:
          "Arrays are data structures that store elements in contiguous memory locations. They provide constant time O(1) access to elements using indices. Arrays have fixed size in many programming languages. Random access is their main advantage, but insertion and deletion can be expensive O(n) operations.",
        metadata: { source: "default", topic: "array" },
      }),
      new Document({
        pageContent:
          "Linked lists are dynamic data structures where elements (nodes) are stored in sequence, but not necessarily in contiguous memory. Each node contains data and a pointer to the next node. Types include singly linked, doubly linked, and circular linked lists. They allow efficient insertion and deletion but require O(n) time for search.",
        metadata: { source: "default", topic: "linked-list" },
      }),
      new Document({
        pageContent:
          "Binary trees are hierarchical data structures where each node has at most two children, referred to as left and right child. Tree traversal methods include inorder, preorder, and postorder. Binary search trees maintain a sorted order where left children are smaller and right children are larger than the parent.",
        metadata: { source: "default", topic: "binary-tree" },
      }),
      new Document({
        pageContent:
          "Hash tables (hash maps) provide average O(1) time complexity for search, insertion, and deletion operations. They use a hash function to compute an index into an array of buckets. Collision resolution techniques include chaining and open addressing. Hash tables are widely used in database indexing and caching.",
        metadata: { source: "default", topic: "hash-table" },
      }),
    ];

    await this.embedAndStoreDocs(defaultDocs);
  }

  // Search for similar documents
  async searchSimilarDocs(query: string, k: number = 4): Promise<Document[]> {
    try {
      // Initialize with defaults if no documents are loaded
      if (this.documents.length === 0) {
        await this.initializeWithDefaults();
      }

      if (this.documents.length === 0) {
        console.log("No documents in store");
        return [];
      }

      // Create embedding for the query
      const queryEmbedding = this.simpleEmbedding(query);

      // Calculate similarities
      const similarities = this.documents.map(({ doc, embedding }) => ({
        doc,
        similarity: this.cosineSimilarity(queryEmbedding, embedding),
      }));

      // Sort by similarity and return top k
      const results = similarities
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, k)
        .map(({ doc }) => doc);

      console.log(
        `Found ${results.length} similar documents for query: "${query}"`
      );
      return results;
    } catch (error) {
      console.error("Error searching documents:", error);
      return [];
    }
  }
}

// Create a singleton instance
const vectorStore = new InMemoryVectorStore();

export const embedAndStoreDocs = (documents: Document[]) =>
  vectorStore.embedAndStoreDocs(documents);

export const searchSimilarDocs = (query: string, k?: number) =>
  vectorStore.searchSimilarDocs(query, k);
