"use client";

import React from "react";
import { CustomButtonAnswer } from "@/components/buttons";

interface QuizProps {
  questionNumber: number;
  questionText: string;
  answerOptions: string[];
  onAnswerSelect: (answer: string) => void;
}

const answerLetters = ["A", "B", "C", "D"];

const QuizComponent: React.FC<QuizProps> = ({
  questionNumber,
  questionText,
  answerOptions,
  onAnswerSelect,
}) => {
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(
    null
  );

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    onAnswerSelect(answer);
  };

  return (
    <div
      className="px-8 py-8 gap-4 w-full"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.10)" }}
    >
      <h2 className="text-3xl font-bold">Question {questionNumber}</h2>
      <p className="text-xl">{questionText}</p>
      <div className="flex gap-2 flex-col">
        {answerOptions.map(
          (option, index) =>
            option && (
              <div key={index} className="flex items-center gap-2">
                <span className="text-xl font-bold">
                  {answerLetters[index]}.
                </span>
                <span className="text-lg">{option}</span>
              </div>
            )
        )}
      </div>
      <div className="flex w-full justify-center items-center gap-8">
        {answerOptions.map((option, index) => (
          <CustomButtonAnswer
            key={index}
            text={answerLetters[index] as "A" | "B" | "C" | "D"}
            onClick={() => handleAnswerClick(option)}
            selected={selectedAnswer === option}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizComponent;
