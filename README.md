# FlashGenius — AI Flashcard & Quiz Generator (July 2026)

> Paste your study notes. Get smart flashcards and an adaptive quiz in seconds.

**Live demo:** [https://bright-card-bot.lovable.app](https://bright-card-bot.lovable.app)

**Resume line:**  
*Built and deployed an AI-powered flashcard web app that converts raw study notes into structured flashcards and adaptive quizzes; designed the AI prompt pipeline and JSON response schema.*

---

## What it does

FlashGenius turns messy lecture notes, textbook snippets, or quick scribbles into a complete study set:

1. **Paste notes** — up to ~3,000 words on any topic.
2. **Generate** — AI reads the notes and returns structured study material.
3. **Study** — flip through flashcards, then test yourself with a scored MCQ quiz.

The app is anonymous, mobile-first, and runs entirely in the browser (study sets are cached in `localStorage`).

---

## Features

- **Landing page** with a large, minimal textarea and one-click generation.
- **10 AI-generated flashcards** — tap to flip between question and answer.
- **Progress bar** — know exactly where you are in the deck ("Card 3 of 10").
- **5-question adaptive quiz** — easy / medium / hard questions with instant feedback.
- **Explanations** — every quiz answer shows a one-line explanation.
- **Final score screen** — percentage, encouraging message, and quick retake.
- **Dark, minimal UI** — built for mobile, comfortable on desktop.
- **Graceful fallback** — if the AI fails, the app uses a built-in biology sample set so the UI never breaks.

---

## Tech stack

| Layer | Tech |
| --- | --- |
| Framework | TanStack Start (full-stack React 19) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 with custom dark theme |
| UI primitives | shadcn/ui (Button, Textarea, Progress) |
| AI | Lovable AI Gateway + Google Gemini 2.5 Flash |
| Schema validation | Zod |
| State | React `useState` + `localStorage` persistence |
| Icons | Lucide React |

---

## AI prompt pipeline

The generation is handled by a server function that calls the Lovable AI Gateway.

### System prompt

```text
You are FlashGenius, a study assistant that turns raw notes into study material.
Return ONLY JSON matching exactly this shape:
{ "flashcards": [ { "id": 1, "question": "string", "answer": "string" } ], "quiz": [ { "id": 1, "difficulty": "easy", "question": "string", "options": ["string", "string", "string", "string"], "correctAnswerIndex": 0, "explanation": "string" } ] }
Rules:
- Produce 8-12 flashcards and 5-8 quiz questions, all grounded strictly in the provided notes.
- ids start at 1 and increase by 1 within each array.
- Each quiz question has exactly 4 options, one correct; correctAnswerIndex is a 0-based index.
- difficulty is one of "easy", "medium", "hard".
- Keep questions short and answers/explanations one or two sentences.
```

### JSON schema validation

The AI response is validated with Zod before reaching the UI:

```typescript
const StudySetSchema = z.object({
  flashcards: z.array(z.object({
    id: z.number(),
    question: z.string(),
    answer: z.string(),
  })).min(1),
  quiz: z.array(z.object({
    id: z.number(),
    difficulty: z.enum(["easy", "medium", "hard"]),
    question: z.string(),
    options: z.array(z.string()).length(4),
    correctAnswerIndex: z.number(),
    explanation: z.string(),
  })).min(1),
});
```

### Why this design

- **Strict schema** forces consistent output and eliminates brittle string parsing.
- **Difficulty levels** make the quiz feel adaptive, not random.
- **Explanations** turn wrong answers into learning moments.
- **Server-side AI call** keeps the API key out of the browser.

---

## Screenshots

> Add screenshots of the three main screens below.

| Landing page | Flashcards | Quiz |
| --- | --- | --- |
| ![Landing](docs/screenshot-landing.png) | ![Flashcards](docs/screenshot-flashcards.png) | ![Quiz](docs/screenshot-quiz.png) |

---

## Project structure

```text
src/
├── routes/
│   ├── index.tsx          # Landing page + note input
│   ├── flashcards.tsx     # Flip-card deck + progress
│   └── quiz.tsx           # MCQ quiz + score screen
├── lib/
│   ├── study-data.ts      # Fallback study set + TypeScript types
│   ├── study.functions.ts # Server function: AI generation
│   ├── ai-gateway.server.ts # Lovable AI Gateway provider
│   └── study-store.ts     # localStorage persistence
├── components/ui/         # shadcn/ui primitives
├── styles.css             # Dark theme + 3D flip utilities
└── router.tsx             # TanStack Router setup
```

---

## Local setup

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd flashgenius

# 2. Install dependencies
bun install
# or: npm install

# 3. Add environment variables
cp .env.example .env
# Edit .env and add your LOVABLE_API_KEY

# 4. Run the dev server
bun dev
# or: npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:8080` or `http://localhost:5173`).

---

## Deployment

The live app is published through Lovable at:

**[https://bright-card-bot.lovable.app](https://bright-card-bot.lovable.app)**

To sync to your own GitHub repository, click the **GitHub sync** button in the Lovable editor and follow the connection flow.

---

## Links

- **Live app:** [https://bright-card-bot.lovable.app](https://bright-card-bot.lovable.app)
- **GitHub repo:** *Add your repository link after syncing*
- **LinkedIn post:** *Add your LinkedIn post link after publishing*

---

## What I learned

- How to bridge a React frontend with a typed server function for AI calls.
- How to design a strict JSON schema prompt so AI output stays predictable.
- How to build a mobile-first, dark-themed UI with Tailwind CSS v4 custom utilities.
- How to keep the app usable offline / anonymous by caching the study set in `localStorage`.

---

*Built by Krushna Chandra Panda with Lovable, TanStack Start, and the Lovable AI Gateway.*
