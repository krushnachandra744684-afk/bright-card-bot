import type { StudySet } from "./study-data";
import { fallbackStudySet } from "./study-data";

const KEY = "flashgenius:studyset";

export function saveStudySet(set: StudySet) {
  try {
    localStorage.setItem(KEY, JSON.stringify(set));
  } catch {
    /* ignore */
  }
}

export function loadStudySet(): StudySet {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StudySet;
      if (parsed?.flashcards?.length && parsed?.quiz?.length) return parsed;
    }
  } catch {
    /* ignore */
  }
  return fallbackStudySet;
}
