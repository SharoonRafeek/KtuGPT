import { getChromaCollection } from "./chroma-client";
import { Document } from "langchain/document";

// Simple text-based similarity using TF-IDF-like approach
function simpleEmbedding(text: string): number[] {
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

  // Add text length and common DS&A keywords
  const dsKeywords = [
    "stack",
    "queue",
    "array",
    "tree",
    "graph",
    "algorithm",
    "data",
    "structure",
    "sort",
    "search",
    "binary",
    "heap",
    "hash",
    "linked",
    "list",
    "pointer",
    "recursion",
    "iteration",
    "complexity",
    "time",
    "space",
    "big",
    "o",
  ];

  dsKeywords.forEach((keyword, idx) => {
    if (text.toLowerCase().includes(keyword)) {
      const index = (idx * 13) % 384;
      embedding[index] += 2; // Boost DS&A related terms
    }
  });

  // Normalize the vector
  const magnitude = Math.sqrt(
    embedding.reduce((sum, val) => sum + val * val, 0)
  );
  if (magnitude > 0) {
    for (let i = 0; i < embedding.length; i++) {
      embedding[i] /= magnitude;
    }
  }

  return embedding;
}

export async function embedAndStoreDocs(docs: Document[]) {
  try {
    const collection = await getChromaCollection();

    console.log(`Embedding and storing ${docs.length} documents...`);

    // Prepare data for Chroma
    const ids: string[] = [];
    const embeddings: number[][] = [];
    const documents: string[] = [];
    const metadatas: any[] = [];

    docs.forEach((doc, index) => {
      ids.push(`doc_${index}`);
      embeddings.push(simpleEmbedding(doc.pageContent));
      documents.push(doc.pageContent);
      metadatas.push({
        source: doc.metadata.source || "unknown",
        page: doc.metadata.page || 0,
        ...doc.metadata,
      });
    });

    // Add documents to collection
    await collection.add({
      ids,
      embeddings,
      documents,
      metadatas,
    });

    console.log(`Successfully stored ${docs.length} documents in Chroma`);
  } catch (error) {
    console.error("Error storing documents:", error);
    throw new Error("Failed to store documents in Chroma");
  }
}

export async function searchSimilarDocs(
  query: string,
  k: number = 4
): Promise<Document[]> {
  try {
    const collection = await getChromaCollection();

    // Create embedding for the query
    const queryEmbedding = simpleEmbedding(query);

    // Search for similar documents
    const results = await collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: k,
      include: ["documents", "metadatas", "distances"],
    });

    // Convert results to LangChain Document format
    const documents: Document[] = [];

    if (
      results.documents &&
      results.documents[0] &&
      results.metadatas &&
      results.metadatas[0]
    ) {
      for (let i = 0; i < results.documents[0].length; i++) {
        const content = results.documents[0][i];
        const metadata = results.metadatas[0][i] as any;

        if (content) {
          documents.push(
            new Document({
              pageContent: content,
              metadata: metadata || {},
            })
          );
        }
      }
    }

    console.log(
      `Found ${documents.length} similar documents for query: "${query}"`
    );
    return documents;
  } catch (error) {
    console.error("Error searching documents:", error);
    throw new Error("Failed to search documents in Chroma");
  }
}
