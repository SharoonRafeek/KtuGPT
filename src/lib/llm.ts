import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const streamingModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  streaming: true,
  verbose: true,
  temperature: 0,
});

export const nonStreamingModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  verbose: true,
  temperature: 0,
});
