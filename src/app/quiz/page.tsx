"use client";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  nextQuestion,
  selectAnswer,
  calculateScore,
  resetQuiz,
  useHint,
  decrementTimer,
  resetTimer,
  recordQuestionAnswer,
  skipQuestion,
} from "@/store/quizSlice";
import { CustomButton } from "@/components/buttons";
import Score from "@/components/score";
import QuizComponent from "@/components/quiz";
// import QuizCompleted from "@/components/quizCompleted";
import TimerDisplay from "@/components/timerDisplay";
import QuizHeader from "@/components/header";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";

const SHUFFLE_COUNT = 30;

const QuizCompleted = lazy(() => import("@/components/quizCompleted"));

const shuffleArray = <T,>(array: T[]): T[] =>
  array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);

const getDisplayedOptions = (
  currentQuestion: { answerOptions: string[] },
  hintOptions: string[]
): string[] => {
  if (hintOptions.length > 0) {
    return currentQuestion.answerOptions.filter(
      (option) => !hintOptions.includes(option)
    );
  }
  return currentQuestion.answerOptions;
};

export default function Quiz() {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex, score, quizCompleted, hintsUsed } =
    useSelector((state: RootState) => state.quiz);

  //   const [timeLeft, setTimeLeft] = useState(SHUFFLE_COUNT);
  const [hintOptions, setHintOptions] = useState<string[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState(() =>
    shuffleArray(
      questions.map((q) => ({
        ...q,
        userAnswer: "",
        answerOptions: shuffleArray(q.answerOptions),
      }))
    )
  );
  const [timePerQuestion, setTimePerQuestion] = useState<number[]>([]);

  const maxHints = useSelector((state: RootState) => state.quiz.maxHints) || 3;

  const { timeLeft } = useSelector((state: RootState) => state.quiz);

  useEffect(() => {
    if (timeLeft === 0) handleNextQuestion();

    const timer = setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, dispatch]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length) {
      setTimePerQuestion((prev) => [...prev, SHUFFLE_COUNT - timeLeft]);
      const currentQuestion = shuffledQuestions[currentQuestionIndex];
      dispatch(
        recordQuestionAnswer({
          questionNumber: currentQuestion.questionNumber,
          userAnswer: currentQuestion.userAnswer,
          correctAnswer: currentQuestion.correctAnswer,
          timeSpent: SHUFFLE_COUNT - timeLeft,
        })
      );
      dispatch(calculateScore());
      dispatch(nextQuestion());
      dispatch(resetTimer());
    }
  };

  const handleAnswerSelect = (answer: string) => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    shuffledQuestions[currentQuestionIndex].userAnswer = answer;

    isCorrect &&
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

    Swal.fire({
      title: isCorrect ? "Correct!" : "Wrong!",
      text: isCorrect
        ? "Great job!"
        : `The correct answer is: ${currentQuestion.correctAnswer}.`,
      icon: isCorrect ? "success" : "error",
      confirmButtonText: "Next",
      theme: "dark",
      confirmButtonColor: isCorrect ? "#4CAF50" : "#F44336",
    }).then(() => {
      dispatch(
        selectAnswer({ questionNumber: currentQuestion.questionNumber, answer })
      );
      handleNextQuestion();
    });
  };

  const handleUseHint = () => {
    if (hintsUsed < maxHints) {
      const currentQuestion = shuffledQuestions[currentQuestionIndex];
      const incorrectAnswers = currentQuestion.answerOptions.filter(
        (option) => option !== currentQuestion.correctAnswer
      );
      const eliminatedOptions = incorrectAnswers.slice(0, 2);
      setHintOptions(eliminatedOptions);
      dispatch(useHint());

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${hintOptions.length} wrong answers eliminated!`,
        showConfirmButton: false,
        timer: 2500,
        toast: true,
        theme: "dark",
      });
    }
  };

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const displayedOptions = useMemo(
    () => getDisplayedOptions(currentQuestion, hintOptions),
    [hintOptions, currentQuestion]
  );

  if (quizCompleted) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <QuizCompleted
          score={score}
          totalQuestions={shuffledQuestions.length}
          timePerQuestion={timePerQuestion}
          onRestart={() => dispatch(resetQuiz())}
        />
      </Suspense>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8">
      <Score
        score={score}
        totalQuestions={shuffledQuestions.length}
        currentQuestionIndex={currentQuestionIndex || 0}
      />
      <QuizHeader title="Awesome Quiz Game 👋" />
      <TimerDisplay timeLeft={timeLeft} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="min-w-1/2"
        >
          <QuizComponent
            questionNumber={currentQuestionIndex + 1}
            questionText={currentQuestion.questionText}
            answerOptions={displayedOptions}
            onAnswerSelect={handleAnswerSelect}
          />
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-4">
        <CustomButton
          text={`Use Hint (${maxHints - hintsUsed} left)`}
          onClick={handleUseHint}
          disabled={hintsUsed >= maxHints}
          className={`${
            hintsUsed < maxHints
              ? "bg-green-400 hover:bg-green-500"
              : "bg-gray-400"
          } transition-all`}
        />
        <CustomButton
          text="Skip Question"
          onClick={() => dispatch(skipQuestion())}
          className="bg-yellow-600"
        />
      </div>
    </div>
  );
}
