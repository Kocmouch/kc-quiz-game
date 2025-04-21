import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import questionsData from "../data/questions.json";

interface Question {
  questionNumber: number;
  questionText: string;
  answerOptions: string[];
  correctAnswer: string;
}

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: Record<number, string>;
  score: number;
  quizCompleted: boolean;
  hintsUsed: number;
  maxHints: number;
  timeLeft: number;
  timePerQuestion: number[];
  questionHistory: {
    questionNumber: number;
    userAnswer: string;
    correctAnswer: string;
    timeSpent: number;
  }[];
}

const MAX_HINTS = 3;

const initialState: QuizState = {
  questions: questionsData,
  currentQuestionIndex: 0,
  userAnswers: {},
  score: 0,
  quizCompleted: false,
  hintsUsed: 0,
  maxHints: MAX_HINTS,
  timeLeft: 30,
  timePerQuestion: [],
  questionHistory: [],
};

const calculateUserScore = (
  questions: Question[],
  userAnswers: Record<number, string>
): number =>
  questions.reduce(
    (acc, question) =>
      acc +
      (userAnswers[question.questionNumber] === question.correctAnswer ? 1 : 0),
    0
  );

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    selectAnswer: (
      state,
      action: PayloadAction<{ questionNumber: number; answer: string }>
    ) => {
      state.userAnswers[action.payload.questionNumber] = action.payload.answer;
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      } else {
        state.quizCompleted = true;
      }
    },
    calculateScore: (state) => {
      state.score = calculateUserScore(state.questions, state.userAnswers);
    },
    resetQuiz: (state) => {
      Object.assign(state, initialState);
    },
    useHint: (state) => {
      if (state.hintsUsed < state.maxHints) {
        state.hintsUsed += 1;
      }
    },
    // setTimeLeft: (state, action: PayloadAction<number>) => {
    //   state.timeLeft = action.payload;
    // },
    decrementTimer: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
    resetTimer: (state) => {
      state.timeLeft = 30;
    },
    recordQuestionAnswer: (
      state,
      action: PayloadAction<{
        questionNumber: number;
        userAnswer: string;
        correctAnswer: string;
        timeSpent: number;
      }>
    ) => {
      state.questionHistory.push(action.payload);
    },
    skipQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        const currentQuestion = state.questions[state.currentQuestionIndex];
        state.userAnswers[currentQuestion.questionNumber] = "skipped";
        state.currentQuestionIndex += 1;
      } else {
        state.quizCompleted = true;
      }
    },
  },
});

export const {
  selectAnswer,
  nextQuestion,
  calculateScore,
  resetQuiz,
  useHint,
  // setTimeLeft,
  decrementTimer,
  resetTimer,
  recordQuestionAnswer,
  skipQuestion,
} = quizSlice.actions;

export default quizSlice.reducer;
