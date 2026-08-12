import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({ notes: z.string().min(20).max(20000) });

const StudySetSchema = z.object({
  flashcards: z
    .array(
      z.object({
        id: z.number(),
        question: z.string(),
        answer: z.string(),
      }),
    )
    .min(1),
  quiz: z
    .array(
      z.object({
        id: z.number(),
        difficulty: z.enum(["easy", "medium", "hard"]),
        question: z.string(),
        options: z.array(z.string()).length(4),
        correctAnswerIndex: z.number(),
        explanation: z.string(),
      }),
    )
    .min(1),
});

const SYSTEM_PROMPT = `You are FlashGenius, a study assistant that turns raw notes into study material.
Return ONLY JSON matching exactly this shape:
{ "flashcards": [ { "id": 1, "question": "string", "answer": "string" } ], "quiz": [ { "id": 1, "difficulty": "easy", "question": "string", "options": ["string", "string", "string", "string"], "correctAnswerIndex": 0, "explanation": "string" } ] }
Rules:
- Produce 8-12 flashcards and 5-8 quiz questions, all grounded strictly in the provided notes.
- ids start at 1 and increase by 1 within each array.
- Each quiz question has exactly 4 options, one correct; correctAnswerIndex is a 0-based index.
- difficulty is one of "easy", "medium", "hard".
- Keep questions short and answers/explanations one or two sentences.`;

export const generateStudySet = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured yet. Missing LOVABLE_API_KEY.");

    const { streamText, Output, NoObjectGeneratedError } = await import("ai");
    const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");

    const gateway = createLovableAiGatewayProvider(apiKey);

    try {
      const result = streamText({
        model: gateway("google/gemini-2.5-flash"),
        system: SYSTEM_PROMPT,
        prompt: `Notes:\n\n${data.notes}`,
        output: Output.object({ schema: StudySetSchema }),
      });

      const output = await result.output;
      return {
        flashcards: output.flashcards.map((c, i) => ({ ...c, id: i + 1 })),
        quiz: output.quiz.map((q, i) => ({
          ...q,
          id: i + 1,
          correctAnswerIndex: Math.min(Math.max(q.correctAnswerIndex, 0), q.options.length - 1),
        })),
      };
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error)) {
        throw new Error("The AI couldn't structure those notes. Try adding more detail.");
      }
      const message = error instanceof Error ? error.message : "Unknown error";
      if (message.includes("429")) throw new Error("Rate limit reached — please retry shortly.");
      if (message.includes("402"))
        throw new Error("AI credits exhausted. Add credits in your workspace settings.");
      throw new Error(message);
    }
  });
