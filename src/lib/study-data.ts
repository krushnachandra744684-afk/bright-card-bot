export type Flashcard = { id: number; front: string; back: string };
export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
};

export const flashcards: Flashcard[] = [
  { id: 1, front: "What is photosynthesis?", back: "The process plants use to convert light energy into chemical energy stored as glucose." },
  { id: 2, front: "Define mitochondria", back: "Organelles that generate most of the cell's ATP through cellular respiration." },
  { id: 3, front: "What is osmosis?", back: "Movement of water across a semi-permeable membrane from low to high solute concentration." },
  { id: 4, front: "State Newton's First Law", back: "An object stays at rest or in uniform motion unless acted on by a net external force." },
  { id: 5, front: "What is an enzyme?", back: "A protein catalyst that speeds up biochemical reactions without being consumed." },
  { id: 6, front: "Define entropy", back: "A measure of disorder or randomness in a system; it tends to increase over time." },
  { id: 7, front: "What is DNA replication?", back: "The semi-conservative process of copying DNA so each new strand pairs with a template." },
  { id: 8, front: "What is a covalent bond?", back: "A chemical bond formed when two atoms share one or more pairs of electrons." },
  { id: 9, front: "Define diffusion", back: "Net movement of particles from an area of higher concentration to lower concentration." },
  { id: 10, front: "What is homeostasis?", back: "The maintenance of a stable internal environment despite external changes." },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which organelle produces most of the cell's ATP?",
    options: ["Ribosome", "Mitochondria", "Golgi body", "Nucleus"],
    answerIndex: 1,
  },
  {
    id: 2,
    question: "Photosynthesis mainly takes place in the…",
    options: ["Chloroplast", "Vacuole", "Cell wall", "Lysosome"],
    answerIndex: 0,
  },
  {
    id: 3,
    question: "Newton's First Law is also known as the law of…",
    options: ["Gravity", "Acceleration", "Inertia", "Momentum"],
    answerIndex: 2,
  },
  {
    id: 4,
    question: "Osmosis is the movement of which substance?",
    options: ["Oxygen", "Glucose", "Water", "Salt"],
    answerIndex: 2,
  },
  {
    id: 5,
    question: "A covalent bond involves…",
    options: ["Sharing electrons", "Transferring electrons", "Losing protons", "Gaining neutrons"],
    answerIndex: 0,
  },
];
