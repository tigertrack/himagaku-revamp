import React from "react";
import { useMemo } from "react";
interface Props {
  correctCount: number;
  questionCount: number;
  backtoHome?: () => void;
}
const Result: React.FC<Props> = ({
  correctCount,
  questionCount,
  backtoHome,
}) => {
  const scorePercentage = useMemo(
    () => Math.floor((correctCount / questionCount) * 100),
    [correctCount, questionCount]
  );
  const scoreMessage = useMemo(
    () =>
      scorePercentage > 90
        ? "お疲れ様でした！"
        : scorePercentage > 75
        ? "よく頑張ったね！"
        : "もうちょっと勉強しましょう",
    [scorePercentage]
  );

  const scoreColor = useMemo(
    () =>
      scorePercentage > 90
        ? 'text-green-500'
        : scorePercentage > 75
        ? 'text-orange-500'
        : 'text-[#ff6b6b]',
    [scorePercentage]
  );

  return (
    <div className="w-full md:w-3/5 md:border md:border-gray-500 lg:w-96 p-7 rounded-lg flex justify-center items-center flex-col">
      <div className=" text-2xl font-bold">{scoreMessage}</div>
      <div className={`py-4 ${scoreColor} text-5xl font-extrabold `}>
        {scorePercentage}% score
      </div>
      <div className="pb-4 text-xl font-bold">
        Quiz completed succesfully
      </div>
      <div className=" text-center">
        you&apos;ve submitted{" "}
        <span className="text-green-500 font-bold">
          {correctCount} correct answers{" "}
        </span>{" "}
        out of{" "}
        <span className="font-bold text-[#225F96]">
          {questionCount} questions
        </span>
        .
      </div>
      <button
        className="py-3 px-5 rounded-lg mt-8 bg-gray-800 text-lg w-full"
        onClick={backtoHome}
      >
        back to quiz selection
      </button>
    </div>
  );
};

export default Result;
