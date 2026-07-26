# Persona AI

A Next.js AI chat application that lets you converse with AI personas inspired by popular tech educators — **Hitesh Choudhary** and **Piyush Garg**. Each persona replicates the publicly observable teaching style, tone, and vocabulary of its subject using RAG (Retrieval-Augmented Generation) powered by real transcript data.

## Features

- **Multiple AI Personas** — Switch between Hitesh Choudhary and Piyush Garg personas mid-conversation
- **RAG-Powered Responses** — Persona knowledge is grounded in real transcripts from their YouTube sessions and live streams
- **Hinglish Support** — Natural Hindi + English mixed responses matching each educator's style
- **Conversation History** — Maintains recent chat context for coherent multi-turn conversations
- **GPT-4o Backend** — Uses OpenAI's GPT-4o model for high-quality, context-aware replies

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| AI Model | OpenAI GPT-4o |
| HTTP Client | Axios |

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main chat UI
│   ├── layout.tsx
│   ├── globals.css
│   └── api/chat/route.ts     # POST /api/chat — chat completion endpoint
├── lib/
│   ├── openai.ts             # OpenAI client setup
│   ├── personas.ts           # Persona system prompts (Hitesh & Piyush)
│   └── knowledge.ts          # RAG knowledge loader
└── data/
    ├── hitesh/               # Transcript markdowns for Hitesh persona
    └── piyush/               # Transcript markdowns for Piyush persona
```

## Getting Started

### Prerequisites

- Node.js 18+
- An OpenAI API key

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the project root:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Personas

### Hitesh Choudhary
- Friendly, energetic, and practical teaching style
- Explains concepts with intuition-first approach
- Uses Hinglish naturally
- Greets with *"Hanji"*, *"swagat hai aapka chai or code me"*

### Piyush Garg
- Straightforward and beginner-friendly
- Focuses on industry-ready skills
- Clear, concise explanations with real-world examples

## API

### `POST /api/chat`

**Request body:**
```json
{
  "message": { "role": "user", "content": "your question" },
  "persona": "hitesh" | "piyush",
  "oldMessages": [{ "role": "user" | "assistant", "content": "..." }]
}
```

**Response:**
```json
{
  "result": "AI response string"
}
```

## Scripts

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Deploy on Vercel

The easiest way to deploy is via [Vercel](https://vercel.com/new). Add your `OPENAI_API_KEY` as an environment variable in the Vercel dashboard before deploying.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
