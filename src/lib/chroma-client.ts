import { ChromaClient, Collection } from "chromadb";
import { env } from "./config";

let chromaClientInstance: ChromaClient | null = null;
let collectionInstance: Collection | null = null;

// Initialize Chroma client
async function initChromaClient() {
  try {
    // Try to use in-memory mode first (easier for development)
    const chromaClient = new ChromaClient();
    console.log("Chroma client initialized in memory mode");
    return chromaClient;
  } catch (error) {
    console.error("Failed to initialize Chroma client:", error);
    throw new Error("Failed to initialize Chroma Client");
  }
}

// Get or create collection
async function getOrCreateCollection(
  client: ChromaClient,
  collectionName: string
) {
  try {
    // Try to get existing collection
    const collection = await client.getCollection({
      name: collectionName,
    });
    console.log(`Collection '${collectionName}' already exists`);
    return collection;
  } catch (error) {
    // Collection doesn't exist, create it
    try {
      const collection = await client.createCollection({
        name: collectionName,
        metadata: { description: "KtuGPT document embeddings" },
        embeddingFunction: null, // We'll provide our own embeddings
      });
      console.log(`Collection '${collectionName}' created successfully`);
      return collection;
    } catch (createError) {
      console.error("Failed to create collection:", createError);
      throw new Error("Failed to create collection");
    }
  }
}

export async function getChromaClient() {
  if (!chromaClientInstance) {
    chromaClientInstance = await initChromaClient();
  }
  return chromaClientInstance;
}

export async function getChromaCollection() {
  if (!collectionInstance) {
    const client = await getChromaClient();
    collectionInstance = await getOrCreateCollection(client, "ktugpt-docs");
  }
  return collectionInstance;
}
