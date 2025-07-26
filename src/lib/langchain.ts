import { searchSimilarDocs } from "./simple-vector-store";
import { QA_TEMPLATE } from "./prompt-templates";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "./config";

type callChainArgs = {
  question: string;
  chatHistory: string;
};

export async function callChain({ question, chatHistory }: callChainArgs) {
  try {
    // Clean the question
    const sanitizedQuestion = question.trim().replaceAll("\n", " ");

    console.log("Processing question:", sanitizedQuestion);

    // Check if question is related to DS&A
    const dsaKeywords = [
      "stack",
      "queue",
      "array",
      "tree",
      "graph",
      "algorithm",
      "data structure",
      "sort",
      "search",
      "binary",
      "heap",
      "hash",
      "linked list",
      "pointer",
      "recursion",
      "iteration",
      "complexity",
      "time complexity",
      "space complexity",
      "big o",
      "o(n)",
      "lifo",
      "fifo",
      "push",
      "pop",
      "enqueue",
      "dequeue",
      "traversal",
      "insertion",
      "deletion",
      "node",
      "vertex",
      "edge",
      "path",
      "bubble sort",
      "quick sort",
      "merge sort",
      "binary search",
      "dfs",
      "bfs",
      "dynamic programming",
      "greedy",
      "divide and conquer",
    ];

    const questionLower = sanitizedQuestion.toLowerCase();
    const isDSARelated = dsaKeywords.some((keyword) =>
      questionLower.includes(keyword.toLowerCase())
    );

    // If not DS&A related, return polite redirect
    if (!isDSARelated) {
      return {
        text: "I'm KtuGPT, a specialized assistant for Data Structures and Algorithms questions. I can help you with topics like:\n\n• Data Structures: Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Hash Tables\n• Algorithms: Sorting, Searching, Traversal, Dynamic Programming\n• Complexity Analysis: Time and Space Complexity, Big O notation\n\nPlease ask me a question related to Data Structures and Algorithms, and I'll be happy to help!",
        sources: [],
      };
    }

    // Step 1: Retrieve relevant documents from simple vector store
    const docs = await searchSimilarDocs(sanitizedQuestion, 4);
    const context = docs.map((doc) => doc.pageContent).join("\n\n");

    console.log("Context found:", context.length > 0 ? "Yes" : "No");

    // Generate response using Gemini LLM
    let responseText =
      "I can help you with Data Structures and Algorithms questions.";

    if (context.length > 0) {
      try {
        // Create a proper prompt for the LLM
        const prompt = `You are KtuGPT, a helpful assistant specialized in Data Structures and Algorithms. Use the following context from DS&A materials to answer the user's question clearly and comprehensively.

Context from DS&A materials:
${context}

User Question: ${sanitizedQuestion}

Please provide a clear, educational explanation based on the context above. If the question is about comparing concepts (like stack vs queue), structure your answer with clear sections. Include examples and use cases where relevant.

Answer:`;

        console.log("Generating LLM response...");

        // Use Google Generative AI directly
        const genAI = new GoogleGenerativeAI(env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        responseText = response.text();

        console.log("LLM response generated successfully");
      } catch (llmError) {
        console.error("LLM generation failed:", llmError);

        // Fallback to formatted context response
        responseText = `Based on the DS&A materials:\n\n${context.substring(
          0,
          800
        )}${context.length > 800 ? "..." : ""}`;
      }
    } else {
      responseText =
        "I couldn't find relevant information in the DS&A materials for your question. Could you please rephrase or ask about a specific data structure or algorithm topic?";
    }

    // Return structured response
    const sourceDocuments = docs.slice(0, 2);
    const pageContents = sourceDocuments.map((doc) => doc.pageContent);

    return {
      text: responseText,
      sources: pageContents,
    };
  } catch (e) {
    console.error("Chain execution error:", e);
    return {
      text: "I apologize, but I'm having trouble processing your question right now. Please try again.",
      sources: [],
    };
  }
}
