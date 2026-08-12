import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateStudySet } from "@/lib/study.functions";
import { saveStudySet } from "@/lib/study-store";
import { Sparkles, Layers, ListChecks, Loader2 } from "lucide-react";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FlashGenius — Turn notes into flashcards & quizzes" },
      {
        name: "description",
        content:
          "Paste your study notes and instantly get flippable flashcards and a scored multiple-choice quiz. Minimal, dark, mobile-first.",
      },
      { property: "og:title", content: "FlashGenius — Study smarter from your notes" },
      {
        property: "og:description",
        content: "Paste notes, generate flashcards and quizzes, and track your score.",
      },
    ],
  }),
  component: Landing,
});

const SAMPLE = `Photosynthesis converts light energy into glucose in the chloroplast.
Mitochondria produce ATP through cellular respiration.
Osmosis is the movement of water across a semi-permeable membrane.`;

function Landing() {
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-5 pb-16 pt-14">
      <div className="flex items-center gap-2 text-sm font-medium text-primary">
        <Sparkles className="h-4 w-4" />
        FlashGenius
      </div>

      <h1 className="mt-8 text-4xl font-semibold leading-tight tracking-tight">
        Turn messy notes into
        <span className="text-primary"> smart study sets</span>
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Paste anything from a lecture, textbook or your own scribbles. We&apos;ll shape it into
        flashcards and a quick quiz.
      </p>

      <div className="mt-8 rounded-2xl bg-card p-2 glow-ring">
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Paste your notes here…"
          className="min-h-52 resize-none border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center justify-between gap-3 px-2 pb-1">
          <button
            type="button"
            onClick={() => setNotes(SAMPLE)}
            className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Use sample notes
          </button>
          <span className="text-xs text-muted-foreground">{notes.trim().length} chars</span>
        </div>
      </div>

      <Button
        size="lg"
        className="mt-5 h-12 w-full rounded-xl text-base font-semibold"
        onClick={() => navigate({ to: "/flashcards" })}
      >
        Generate study set
      </Button>

      <div className="mt-10 grid grid-cols-2 gap-3">
        <Link
          to="/flashcards"
          className="rounded-xl bg-card p-4 transition-colors hover:bg-accent"
        >
          <Layers className="h-5 w-5 text-primary" />
          <p className="mt-3 text-sm font-medium">Flashcards</p>
          <p className="mt-1 text-xs text-muted-foreground">10 cards, tap to flip</p>
        </Link>
        <Link to="/quiz" className="rounded-xl bg-card p-4 transition-colors hover:bg-accent">
          <ListChecks className="h-5 w-5 text-primary" />
          <p className="mt-3 text-sm font-medium">Quiz</p>
          <p className="mt-1 text-xs text-muted-foreground">5 questions, instant feedback</p>
        </Link>
      </div>
    </main>
  );
}
