"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getQuestions, isCorrectAnswer } from "@/functions/quiz";
import { db } from "@/functions/dexie";

import { question } from "@/types";

import Link from "next/link";
import Question from "@/components/Question";
import TimeBar, { exposeMethods } from "@/components/TimeBar";
import Result from "@/components/Result";
import { jlptLevels } from "@/constants";
import QuizPreface from "@/components/QuizPreface";

const QuizPage = () => {
  const [questions, setquestions] = useState<question[]>([]);
  const [questionIndex, setquestionIndex] = useState(0);
  const [score, setscore] = useState(0);
  const [isTimeUp, setisTimeUp] = useState(false);
  const [showPreface, setshowPreface] = useState(true)

  const questionCount: number =
    parseInt(process.env.NEXT_PUBLIC_QUESTION_COUNT!) ?? 20;
  const questionTimeLimit: number =
    parseInt(process.env.NEXT_PUBLIC_QUESTION_TIME_LIMIT!) ?? 6400;

  const router = useRouter();

  const levelparams = useSearchParams();
  const level = levelparams.get("level");

  useEffect(() => {
    const getData = async () => {
      const count = await db.kanjiList.toCollection().count()
      if( count == 0){
        const res = await fetch('./json/kanjiChars.json');
        const data = await res.json();
        await db.kanjiList.bulkAdd(data)
      }
      const kanjiDict = await db.kanjiList.toArray();
      const questions = getQuestions(
        questionCount,
        parseInt(level ?? "1"),
        kanjiDict
      );
      setquestions(questions);
    };
    if (isNaN(parseInt(level!))) {
      router.push("/404");
    }
    getData();
  }, [level, questionCount, router]);

  const handleAnswer = (correct: string, actual: string) => {
    if (isCorrectAnswer(correct, actual)) setscore(score + 1);
    timerRef.current?.stop();
  };

  const showChoice = (): void => {
    timerRef.current?.start();
  };

  const timerRef = useRef<exposeMethods>(null);

  const handleNextQuestion = () => {
    timerRef.current?.reset();
    setisTimeUp(false);
    setquestionIndex(questionIndex + 1);
  };

  const timesUp = () => {
    setisTimeUp(true);
  };

  const levelHeader = (level: string) => {
    const parsedLevel = parseInt(level!);
    return (
      parsedLevel &&
      parsedLevel > 0 &&
      parsedLevel <= 5 && (
        <p>
          <span className="font-bold">
            JLPT N{jlptLevels[parsedLevel - 1].level}
          </span>{" "}
          |{" "}
          <span className="text-gray-400">
            {jlptLevels[parsedLevel - 1].title}
          </span>
        </p>
      )
    );
  };
  // absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
  return (
    <div className="flex flex-col">
      <nav className="p-4 border-b border-b-gray-600 flex justify-between items-center">
        <Link className="border rounded border-gray-600 px-3 py-1" href="/">
          Back
        </Link>
        {levelHeader(level!)}
      </nav>
      <TimeBar
        ref={timerRef}
        timeLimit={questionTimeLimit}
        onTimeUp={timesUp}
      />
      <main className="flex flex-col flex-grow">
        {showPreface && <div className="flex-grow flex items-center absolute top-1/2 -translate-y-1/2 inset-x-0"><QuizPreface onBeginQuiz={() => setshowPreface(false)} /></div>}
        {!showPreface && questions.length > 0 && questionIndex < questions.length && (
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

export default QuizPage;
