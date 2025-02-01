import type { question } from "@/types";
import React, { useState } from "react";
interface Props {
  question?: question;
  isTimeUp?: boolean;
  onNextQuestion: () => void;
  onShowChoice: () => void;
  onAnswer: (correct: string, actual: string) => void;
}
const Question: React.FC<Props> = ({
  question,
  onNextQuestion,
  onAnswer,
  onShowChoice,
  isTimeUp,
}) => {
  const [showOptions, setshowOptions] = useState(false);
  const [answer, setAnswer] = useState("");
  const handleAnswer = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      !isTimeUp &&
      !answer &&
      question &&
      showOptions &&
      event.currentTarget.textContent
    ) {
      onAnswer(question.character, event.currentTarget.textContent);
      setAnswer(event.currentTarget.textContent);
    }
  };

  const handleContinue = () => {
    setAnswer("");
    setshowOptions(false);
    onNextQuestion();
  };

  const showChoice = () => {
    onShowChoice();
    setshowOptions(true);
  };

  const BG_BORDER_CORRECT_ANSWER = "bg-teal-600 hover:border-teal-600";
  const BG_BORDER_INCORRECT_ANSWER = "bg-[#f56b6b] hover:bg-border-[#f56b6b]";

  const getButtonBgStyle = (textValue: string) => {
    const isSelected = answer == textValue;
    const isRightOption = textValue == question?.character;
    const isRightAnswer = answer == question?.character;
    if (isTimeUp && isRightOption) {
      return BG_BORDER_CORRECT_ANSWER;
    } else if ((isSelected && isRightAnswer) || (answer && isRightOption)) {
      return BG_BORDER_CORRECT_ANSWER;
    } else if (isSelected && answer != question?.character) {
      return BG_BORDER_INCORRECT_ANSWER;
    }else if (isTimeUp || answer) {
      return 'cursor-not-allowed'
    } else {
      return `hover:bg-gray-700 hover:border-bray-700`;
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5 mt-12 items-center px-4">
        <div className="flex gap-3 flex-wrap landscape:flex-nowrap landscape:lg:flex-wrap landscape:lg:overflow-x-auto landscape:overflow-x-scroll landscape:w-[80%] justify-center">
          {question?.primary_hint.map((item, index) => (
            <span
              key={index}
              className="px-3 py-1 md:px-4 md:py-2 rounded text-nowrap bg-gray-800 hover:bg-gray-700"
            >
              {item}
            </span>
          ))}
          {question?.secondary_hint?.map((item, index) => (
            <span
              key={index}
              className="px-3 py-1 md:px-4 md:py-2 rounded text-nowrap bg-gray-900 hover:bg-gray-800"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap landscape:flex-nowrap landscape:lg:flex-wrap landscape:lg:overflow-x-auto landscape:overflow-x-scroll landscape:w-[80%] justify-center">
          {question?.meanings?.map((item, index) => (
            <span
              key={index}
              className=" py-1 border-b border-b-gray-600 lg:border-b-0 font-bold text-nowrap hover:border-b-gray-300 hover:border-b"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0">
        {(answer.length > 0 || isTimeUp) && (
          <div className="cursor-pointer text-center mb-5" onClick={handleContinue}>
            Tap here to continue
          </div>
        )}
        {!showOptions && (
          <div className="cursor-pointer text-center mb-3" onClick={showChoice}>
            show options
          </div>
        )}
        <div
          className={`${
            !showOptions && "opacity-0"
          } grid landscape:grid-cols-8 grid-cols-4 landscape:lg:grid-cols-4 landscape:grid-rows-1 grid-rows-2 gap-3 self-end p-4  `}
        >
          {question?.choices.map((item, index) => (
            <div
              className={`text-2xl lg:text-5xl border border-gray-600 text-center p-5 rounded ${
                showOptions && "cursor-pointer"
              } ${getButtonBgStyle(item)}`}
              key={index}
              onClick={handleAnswer}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Question;
