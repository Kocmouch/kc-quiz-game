"use client";
import { CustomButton } from "@/components/buttons";
import { useRouter } from "next/navigation";
import QuizHeader from "@/components/header";

export default function Home() {
  const router = useRouter();

  const handleStartQuiz = () => {
    router.push("/quiz");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-16">
      <QuizHeader title="Awesome Quiz Game 👋" />
      <CustomButton text="Let's start!" onClick={handleStartQuiz} />
    </div>
  );
}
