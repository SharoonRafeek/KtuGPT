# KtuGPT - AI Assistant for KTU Students

🚀 **Live Demo**: [ktugpt1.vercel.app](https://ktugpt1.vercel.app)

### Powered by Google Gemini 2.5 Flash

KtuGPT is an AI-powered assistant designed to help KTU (Kerala Technological University) students with Data Structures and Algorithms questions. The application uses Google's latest Gemini 2.5 Flash model for intelligent, contextual responses about programming concepts.

## Features

- **🤖 Gemini-powered AI**: Uses Google's latest Gemini 2.5 Flash model for fast and accurate responses
- **📚 Smart Content Filtering**: Only answers Data Structures and Algorithms related questions
- **💬 Conversational Interface**: Maintains chat history for contextual conversations
- **⚡ Streaming Responses**: Real-time response streaming for better user experience
- **🎯 Comprehensive Explanations**: Provides detailed explanations with examples and use cases
- **🌙 Dark Mode**: Beautiful dark/light theme toggle

## Technology Stack

- **Frontend**: Next.js 13 with App Router, React, and TypeScript
- **AI Model**: Google Gemini 2.5 Flash via Google Generative AI SDK
- **Vector Search**: Custom in-memory TF-IDF based vector store
- **Styling**: Tailwind CSS with dark mode support
- **UI Components**: Radix UI primitives
- **Deployment**: Vercel serverless functions

## Local Development

1. **Clone the repository**
```bash
git clone https://github.com/SharoonRafeek/KtuGPT.git
cd KtuGPT
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file:
```bash
# Get your free API key from Google AI Studio
GOOGLE_API_KEY=your_google_api_key_here
PDF_PATH=./dsa.pdf
INDEX_INIT_TIMEOUT=60000
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Getting Your Google API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env.local` file

## How It Works

1. **Question Processing**: The app first checks if your question is related to Data Structures and Algorithms
2. **Context Retrieval**: If relevant, it searches through pre-processed DS&A content using vector similarity
3. **AI Generation**: Google Gemini generates comprehensive explanations using the retrieved context
4. **Smart Filtering**: Non-DS&A questions receive a polite redirect to stay focused

## Sample Questions to Try

- "What is a stack and how does it work?"
- "Explain different sorting algorithms"
- "How do binary trees work?"
- "What's the difference between arrays and linked lists?"

---

Built with ❤️ for KTU students | Powered by Google Gemini 2.5 Flash
