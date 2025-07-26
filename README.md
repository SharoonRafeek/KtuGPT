## KtuGPT - AI assistant for KTU students.

### Powered by Google Gemini

KtuGPT is an AI-powered assistant designed to help KTU (Kerala Technological University) students with Data Structures and Algorithms questions. The application uses Google's Gemini AI model through LangChain for intelligent responses and Pinecone for vector-based document retrieval.

### Features

- **Gemini-powered AI**: Uses Google's latest Gemini 2.0 Flash model for fastest and most accurate responses
- **Document-based Q&A**: Retrieves relevant information from uploaded PDF documents
- **Conversational Interface**: Maintains chat history for contextual conversations
- **Streaming Responses**: Real-time response streaming for better user experience
- **Source Citations**: Shows source documents for transparency

### Setup

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
   Copy `.env.example` to `.env.local` and fill in your API keys:

```bash
cp .env.example .env.local
```

Required environment variables:

- `GOOGLE_API_KEY`: Get from [Google AI Studio](https://makersuite.google.com/app/apikey) - Used for chat responses
- `OPENAI_API_KEY`: Get from [OpenAI Platform](https://platform.openai.com/api-keys) - Used for document embeddings
- `PINECONE_API_KEY`: Get from [Pinecone](https://www.pinecone.io/)
- `PINECONE_ENVIRONMENT`: Your Pinecone environment
- `PINECONE_INDEX_NAME`: Your Pinecone index name

4. **Prepare the document index**

```bash
npm run prepare:data
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Technology Stack

- **Frontend**: Next.js 13 with React and TypeScript
- **AI Model**: Google Gemini 2.0 Flash via LangChain
- **Vector Database**: Pinecone for document embeddings
- **Styling**: Tailwind CSS with dark mode support
- **UI Components**: Radix UI primitives

### Migration from OpenAI

This project has been migrated from OpenAI's GPT models to Google's Gemini for improved performance and cost efficiency. The migration includes:

- Replaced OpenAI ChatGPT with Google Gemini 2.0 Flash (latest and fastest model)
- Updated environment variables from `OPENAI_API_KEY` to `GOOGLE_API_KEY`
- Updated LangChain integration to use Google's models
- Maintained all existing functionality and chat interface
