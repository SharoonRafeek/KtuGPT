export type ChatAgent = "user" | "assistant";

export interface ChatMessage {
  role: ChatAgent;
  content: string;
  sources?: string[];
}
