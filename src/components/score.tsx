interface ScoreProps {
  score: number;
  totalQuestions: number;
  currentQuestionIndex: number;
}

const Score: React.FC<ScoreProps> = ({
  score,
  totalQuestions,
  currentQuestionIndex,
}) => {
  return (
    <div
      className="flex flex-col items-start p-8 justify-center absolute top-1/2 left-0 transform -translate-y-1/2 rounded-tr-4xl rounded-br-4xl "
      style={{ backgroundColor: "rgba(255, 255, 255, 0.10)" }}
    >
      <div className="text-4xl font-bold">Scoreboard</div>
      <div className="text-2xl font-bold mt-4">
        Your Score: <span className="text-green-500">{score}</span>
      </div>
      <div className="text-2xl font-bold mt-4">
        Question:{" "}
        <span className="text-green-500">
          {currentQuestionIndex + 1} / {totalQuestions}
        </span>
      </div>
    </div>
  );
};

export default Score;
