import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Flashcard } from "@/lib/study-data";
import { loadStudySet } from "@/lib/study-store";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/flashcards")({
  head: () => ({
    meta: [
      { title: "Flashcards — FlashGenius" },
      {
        name: "description",
        content: "Flip through your generated flashcards and track progress card by card.",
      },
      { property: "og:title", content: "Flashcards — FlashGenius" },
      {
        property: "og:description",
        content: "Tap to flip, swipe through your deck, then jump into the quiz.",
      },
    ],
  }),
  component: FlashcardsScreen,
});

function FlashcardsScreen() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCards(loadStudySet().flashcards);
  }, []);

  const flashcards = cards;
  const card = flashcards[index];
  const total = flashcards.length;
  const isLast = index === total - 1;

  const go = (delta: number) => {
    setFlipped(false);
    setIndex((i) => Math.min(total - 1, Math.max(0, i + delta)));
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-5 pb-10 pt-8">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Notes
        </Link>
        <span className="text-sm font-medium text-muted-foreground">
          Card {Math.min(index + 1, Math.max(total, 1))} of {total}
        </span>
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${total ? ((index + 1) / total) * 100 : 0}%` }}
        />
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-label="Flip card"
        className="mt-8 w-full flip-scene focus:outline-none"
      >
        <div className={`flip-inner h-80 w-full ${flipped ? "flip-inner-active" : ""}`}>
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-card p-8 text-center flip-face glow-ring">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Question
            </span>
            <p className="mt-4 text-2xl font-semibold leading-snug">{card?.question}</p>
            <span className="mt-6 text-xs text-muted-foreground">Tap to reveal</span>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-card p-8 text-center flip-face flip-face-back glow-ring">
            <span className="text-xs uppercase tracking-widest text-primary">Answer</span>
            <p className="mt-4 text-lg leading-relaxed text-card-foreground">{card?.answer}</p>
          </div>
        </div>
      </button>

      <div className="mt-8 flex items-center gap-3">
        <Button
          variant="secondary"
          className="h-12 flex-1 rounded-xl"
          onClick={() => go(-1)}
          disabled={index === 0}
        >
          <ArrowLeft className="h-4 w-4" /> Previous
        </Button>
        {isLast ? (
          <Button
            className="h-12 flex-1 rounded-xl font-semibold"
            onClick={() => navigate({ to: "/quiz" })}
          >
            Start quiz <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="h-12 flex-1 rounded-xl font-semibold" onClick={() => go(1)}>
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      <button
        type="button"
        onClick={() => {
          setIndex(0);
          setFlipped(false);
        }}
        className="mx-auto mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
      >
        <RotateCcw className="h-3.5 w-3.5" /> Restart deck
      </button>
    </main>
  );
}
