import React from "react";
const questionTimeLimit: number =
    parseInt(process.env.NEXT_PUBLIC_QUESTION_TIME_LIMIT!) ?? 6400;
interface Props {
  onBeginQuiz: () => void
}
const QuizPreface: React.FC<Props> = ({onBeginQuiz}) => {
  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="p-4 w-full landscape:w-full landscape:lg:w-3/12 flex flex-col gap-4">
        <h2 className="text-2xl text-center">Before we begin</h2>
        <ol className="list-decimal pl-4">
          <li>
            In this quiz, you will be given 20 kanji questions based on the
            level you choose
          </li>
          <li>
            On each question, you will have approximately {questionTimeLimit}{" "}
            seconds to answer
          </li>
          <li>
            You will see the right answer marked in{" "}
            <span className="bg-teal-600">green</span> and wrong answer marked
            in <span className="bg-[#f56b6b]">red</span> color
          </li>
          <li>
            After answering the last question, you will be given the result of
            your performance on this quiz
          </li>
        </ol>
        <button className="px-4 py-2 bg-gray-800 rounded" onClick={() => onBeginQuiz()}>Begin</button>
      </div>
    </div>
  );
};

export default QuizPreface;
