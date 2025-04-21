"use client";

import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

interface ButtonAnswerProps {
  text: keyof typeof answerColors;
  onClick: () => void;
  className?: string;
  selected?: boolean;
}

const answerColors = {
  A: "-300",
  B: "-400",
  C: "-500",
  D: "-600",
};

const CustomButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  className,
  disabled,
}) => {
  return (
    <div
      className={`font-bold py-1 px-8 rounded-2xl ${
        className ? className : "bg-green-200"
      } ${disabled ? "opacity-50 cursor-not-allowed " : "cursor-pointer"}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

const CustomButtonAnswer: React.FC<ButtonAnswerProps> = ({
  text,
  onClick,
  className,
  selected,
}) => {
  return (
    <div
      className={`${
        selected
          ? `bg-green${answerColors[text] || ""}`
          : `border-2 text-green${answerColors[text] || ""}`
      } border-green${
        answerColors[text]
      } font-regular w-16 h-16 rounded-2xl hover:scale-110 transition cursor-pointer flex justify-center items-center text-3xl ${
        className || ""
      }`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export { CustomButton, CustomButtonAnswer };
