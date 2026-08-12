export type Flashcard = { id: number; question: string; answer: string };
export type QuizQuestion = {
  id: number;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
};
export type StudySet = { flashcards: Flashcard[]; quiz: QuizQuestion[] };

export const fallbackStudySet: StudySet = {
  flashcards: [
    { id: 1, question: "What is photosynthesis?", answer: "The process plants use to convert light energy into chemical energy stored as glucose." },
    { id: 2, question: "Define mitochondria", answer: "Organelles that generate most of the cell's ATP through cellular respiration." },
    { id: 3, question: "What is osmosis?", answer: "Movement of water across a semi-permeable membrane from low to high solute concentration." },
    { id: 4, question: "State Newton's First Law", answer: "An object stays at rest or in uniform motion unless acted on by a net external force." },
    { id: 5, question: "What is an enzyme?", answer: "A protein catalyst that speeds up biochemical reactions without being consumed." },
    { id: 6, question: "Define entropy", answer: "A measure of disorder or randomness in a system; it tends to increase over time." },
    { id: 7, question: "What is DNA replication?", answer: "The semi-conservative process of copying DNA so each new strand pairs with a template." },
    { id: 8, question: "What is a covalent bond?", answer: "A chemical bond formed when two atoms share one or more pairs of electrons." },
    { id: 9, question: "Define diffusion", answer: "Net movement of particles from an area of higher concentration to lower concentration." },
    { id: 10, question: "What is homeostasis?", answer: "The maintenance of a stable internal environment despite external changes." },
  ],
  quiz: [
    {
      id: 1,
      difficulty: "easy",
      question: "Which organelle produces most of the cell's ATP?",
      options: ["Ribosome", "Mitochondria", "Golgi body", "Nucleus"],
      correctAnswerIndex: 1,
      explanation: "Mitochondria carry out cellular respiration, generating most cellular ATP.",
    },
    {
      id: 2,
      difficulty: "easy",
      question: "Photosynthesis mainly takes place in the…",
      options: ["Chloroplast", "Vacuole", "Cell wall", "Lysosome"],
      correctAnswerIndex: 0,
      explanation: "Chloroplasts contain chlorophyll, which captures light energy.",
    },
    {
      id: 3,
      difficulty: "medium",
      question: "Newton's First Law is also known as the law of…",
      options: ["Gravity", "Acceleration", "Inertia", "Momentum"],
      correctAnswerIndex: 2,
      explanation: "Objects resist changes to their state of motion — that resistance is inertia.",
    },
    {
      id: 4,
      difficulty: "easy",
      question: "Osmosis is the movement of which substance?",
      options: ["Oxygen", "Glucose", "Water", "Salt"],
      correctAnswerIndex: 2,
      explanation: "Osmosis specifically describes water moving across a semi-permeable membrane.",
    },
    {
      id: 5,
      difficulty: "medium",
      question: "A covalent bond involves…",
      options: ["Sharing electrons", "Transferring electrons", "Losing protons", "Gaining neutrons"],
      correctAnswerIndex: 0,
      explanation: "Covalent bonding is the sharing of one or more electron pairs between atoms.",
    },
  ],
};
