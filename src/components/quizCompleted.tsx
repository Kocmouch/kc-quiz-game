import { CustomButton } from "@/components/buttons";
import QuizHeader from "@/components/header";

const QuizCompleted = ({
  score,
  totalQuestions,
  timePerQuestion,
  onRestart,
}: {
  score: number;
  totalQuestions: number;
  timePerQuestion: number[];
  onRestart: () => void;
}) => {
  const totalTime = timePerQuestion.reduce((acc, time) => acc + time, 0);
  const averageTime = (totalTime / totalQuestions).toFixed(2);
  const accuracy = ((score / totalQuestions) * 100).toFixed(2);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-16">
      <QuizHeader title="Quiz Completed 🎉" />
      <div className="flex flex-col items-center gap-4">
        <p className="text-2xl">
          Your Score: {score}/{totalQuestions}
        </p>
        <p className="text-xl">Average Time Per Question: {averageTime}s</p>
        <p className="text-xl">Accuracy: {accuracy}%</p>
      </div>
      <CustomButton text="Restart Quiz" onClick={onRestart} />
    </div>
  );
};

export default QuizCompleted;
