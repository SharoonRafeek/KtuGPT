import { NextRequest } from "next/server";
import { callChain } from "@/lib/langchain";
import { Message } from "ai";
import { StreamingTextResponse } from "ai";

const formatMessage = (message: Message) => {
  return `${message.role === "user" ? "Human" : "Assistant"}: ${
    message.content
  }`;
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages: Message[] = body.messages ?? [];
  console.log("Messages ", messages);
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const question = messages[messages.length - 1].content;

  console.log("Chat history ", formattedPreviousMessages.join("\n"));

  if (!question) {
    return new Response("Error: No question in the request", {
      status: 400,
    });
  }

  try {
    const result = await callChain({
      question,
      chatHistory: formattedPreviousMessages.join("\n"),
    });

    // Create a simple streaming response that works with useChat
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // Send the text content
        controller.enqueue(encoder.encode(result.text));
        controller.close();
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Internal server error ", error);
    return new Response("Error: Something went wrong. Try again!", {
      status: 500,
    });
  }
}
