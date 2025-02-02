"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import QuizPreface from "@/components/QuizPreface";
import Question from "@/components/Question";
import Result from "@/components/Result";
import TimeBar, { exposeMethods } from "@/components/TimeBar";

import { question, sourceType } from "@/types";

import { isCorrectAnswer, generateQuestions } from "@/functions/quiz";
import { populateDB } from "@/functions/dexie";

interface Props {
  level: number;
  sourceType: sourceType;
  quizTitle: string;
  quizSubtitle: string;
}

const Quiz: React.FC<Props> = ({ level, sourceType, quizSubtitle, quizTitle }) => {
  const router = useRouter();
  const timerRef = useRef<exposeMethods>(null);

  const questionCount: number =
    parseInt(process.env.NEXT_PUBLIC_QUESTION_COUNT!) ?? 20;
  const questionTimeLimit: number =
    parseInt(process.env.NEXT_PUBLIC_QUESTION_TIME_LIMIT!) ?? 6400;

  const [showPreface, setshowPreface] = useState(true);
  const [questions, setquestions] = useState<question[]>([]);
  const [questionIndex, setquestionIndex] = useState(0);
  const [score, setscore] = useState(0);
  const [isTimeUp, setisTimeUp] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await populateDB();
      const questions = await generateQuestions(
        sourceType as sourceType,
        level ?? 1,
        questionCount
      );
      setquestions(questions);
    };
    console.log("making questions")
    getData();
  }, [level, questionCount, router, sourceType]);

  const handleAnswer = (correct: string, actual: string) => {
    if (isCorrectAnswer(correct, actual)) setscore(score + 1);
    timerRef.current?.stop();
  };

  const showChoice = (): void => {
    timerRef.current?.start();
  };

  const handleNextQuestion = () => {
    timerRef.current?.reset();
    setisTimeUp(false);
    setquestionIndex(questionIndex + 1);
  };

  const timesUp = () => {
    setisTimeUp(true);
  };

  return (
    <div className="flex flex-col">
      <nav className="p-4 border-b border-b-gray-600 flex justify-between items-center">
        <Link className="border rounded border-gray-600 px-3 py-1" href="/">
          Back
        </Link>
        <p>
          <span className="font-bold">
            {quizTitle}
          </span>{" "}
          |{" "}
          <span className="text-gray-400">
            {quizSubtitle}
          </span>
        </p>
      </nav>
      <TimeBar
        ref={timerRef}
        timeLimit={questionTimeLimit}
        onTimeUp={timesUp}
      />
      <main className="flex flex-col flex-grow">
        {showPreface && (
          <div className="flex-grow flex items-center absolute top-1/2 -translate-y-1/2 inset-x-0">
            <QuizPreface onBeginQuiz={() => setshowPreface(false)} />
          </div>
        )}
        {!showPreface &&
          questions.length > 0 &&
          questionIndex < questions.length && (
            <Question
              onShowChoice={showChoice}
              isTimeUp={isTimeUp}
              question={questions[questionIndex]}
              onNextQuestion={handleNextQuestion}
              onAnswer={handleAnswer}
            />
          )}
        {questions.length > 0 && questionIndex >= questions.length && (
          <div className="flex-grow flex flex-col items-center absolute top-1/2 -translate-y-1/2 inset-x-0">
            <Result
              correctCount={score}
              questionCount={questions.length}
              backtoHome={() => router.push("/")}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Quiz;
