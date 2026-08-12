import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { QuizQuestion } from "@/lib/study-data";
import { loadStudySet } from "@/lib/study-store";
import { ArrowLeft, Check, X, Trophy } from "lucide-react";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Quiz — FlashGenius" },
      {
        name: "description",
        content:
          "Answer multiple-choice questions with instant right or wrong feedback and see your final score.",
      },
      { property: "og:title", content: "Quiz — FlashGenius" },
      {
        property: "og:description",
        content: "Instant feedback MCQs generated from your notes, plus a final score summary.",
      },
    ],
  }),
  component: QuizScreen,
});

function QuizScreen() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const total = questions.length;
  const q = questions[index];

  useEffect(() => {
    setQuestions(loadStudySet().quiz);
  }, []);

  const reset = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  };

  const choose = (i: number) => {
    if (selected !== null || !q) return;
    setSelected(i);
    if (i === q.correctAnswerIndex) setScore((s) => s + 1);
  };

  const next = () => {
    if (index === total - 1) {
      setDone(true);
      return;
    }
    setSelected(null);
    setIndex((i) => i + 1);
  };

  if (!q && !done) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5 text-sm text-muted-foreground">
        Loading your quiz…
      </main>
    );
  }

  if (done) {
    const pct = Math.round((score / total) * 100);
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-center px-5 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15">
          <Trophy className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          {pct >= 80 ? "Brilliant work" : pct >= 50 ? "Solid effort" : "Keep studying"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">You finished the quiz</p>
        <p className="mt-8 text-6xl font-semibold text-primary">
          {score}
          <span className="text-2xl text-muted-foreground">/{total}</span>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{pct}% correct</p>

        <div className="mt-10 flex w-full flex-col gap-3">
          <Button className="h-12 rounded-xl font-semibold" onClick={reset}>
            Retake quiz
          </Button>
          <Button variant="secondary" className="h-12 rounded-xl" asChild>
            <Link to="/flashcards">Review flashcards</Link>
          </Button>
          <Link to="/" className="mt-1 text-xs text-muted-foreground hover:text-foreground">
            Back to notes
          </Link>
        </div>
      </main>
    );
  }

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
          Question {index + 1} of {total}
        </span>
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${total ? ((index + 1) / total) * 100 : 0}%` }}
        />
      </div>

      <h1 className="mt-10 text-2xl font-semibold leading-snug">{q!.question}</h1>

      <div className="mt-7 flex flex-col gap-3">
        {q!.options.map((opt: string, i: number) => {
          const isAnswer = i === q!.correctAnswerIndex;
          const isPicked = selected === i;
          const revealed = selected !== null;

          let state = "bg-card hover:bg-accent";
          if (revealed && isAnswer) state = "bg-success/15 ring-1 ring-success";
          else if (revealed && isPicked) state = "bg-destructive/15 ring-1 ring-destructive";
          else if (revealed) state = "bg-card opacity-60";

          return (
            <button
              key={i}
              type="button"
              disabled={revealed}
              onClick={() => choose(i)}
              className={`flex items-center justify-between gap-3 rounded-xl p-4 text-left text-sm font-medium transition-all ${state}`}
            >
              <span>{opt}</span>
              {revealed && isAnswer && <Check className="h-4 w-4 shrink-0 text-success" />}
              {revealed && isPicked && !isAnswer && (
                <X className="h-4 w-4 shrink-0 text-destructive" />
              )}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="mt-auto pt-8">
          <p className="mb-3 text-center text-sm text-muted-foreground">
            {selected === q!.correctAnswerIndex
              ? "Correct!"
              : "Not quite — check the highlighted answer."}
          </p>
          <p className="mb-4 text-center text-xs leading-relaxed text-muted-foreground">
            {q!.explanation}
          </p>
          <Button className="h-12 w-full rounded-xl font-semibold" onClick={next}>
            {index === total - 1 ? "See results" : "Next question"}
          </Button>
        </div>
      )}
    </main>
  );
}
