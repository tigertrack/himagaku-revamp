import React from "react";
import Link from "next/link";
import { jlptLevels } from "@/constants";
import Header from "@/components/Header";
import { getAuthenticatedAppForUser } from "@/service/firebase/serverApp";
import DailyStreak from "../Statistics";
const Home = async () => {
    const { currentUser } = await getAuthenticatedAppForUser();
  return (
    <>
      <Header initialUser={currentUser?.toJSON()}/>
      <div className="px-4 md:mx-auto md:px-0 container mt-3 mb-5">
        <div className="mb-3"><DailyStreak /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded border border-gray-600 md:border-0 md:p-0">
          {jlptLevels.map((level, index) => (
            <div
              key={index}
              className="p-4 border-b border-dashed border-gray-600 md:border md:border-solid md:border-gray-600 gap-3 md:rounded flex justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="text-4xl w-16">N{level.level}</div>
                <div className="flex flex-col gap-1 justify-items-center">
                  <p className="text-base leading-tight">{level.title}</p>
                  <span className="text-xs text-zinc-400 leading-tight">
                    1 of {level.count} Kanji learned
                  </span>
                  <span className="text-xs text-zinc-400 leading-tight">
                    10時間 50分 - 1 Week ago
                  </span>
                </div>
              </div>
              <Link
                href={`/quiz/kanji/${level.level}`}
                className="flex h-fit items-center px-4 py-2 rounded-xl border border-gray-600 flex-grow-0 self-center"
              >
                Start
              </Link>
            </div>
          ))}
          <div className="p-4 border-b border-dashed border-gray-600 md:border md:border-solid md:border-gray-600 gap-3 md:rounded flex justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl w-16">かな</div>
              <div className="flex flex-col gap-1 justify-items-center">
                <p className="text-base leading-tight">Fundamental</p>
                <span className="text-xs text-zinc-400 leading-tight">
                  104 Hiragana characters
                </span>
                <span className="text-xs text-zinc-400 leading-tight">
                    10時間 50分 - 1 Week ago
                  </span>
              </div>
            </div>
            <Link
              href={`/quiz/kana/1`}
              className="flex h-fit items-center px-4 py-2 rounded-xl border border-gray-600 flex-grow-0 self-center"
            >
              Start
            </Link>
          </div>
          <div className="p-4 md:border md:border-gray-600 gap-3 md:rounded flex justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl w-16">カナ</div>
              <div className="flex flex-col gap-1 justify-items-center">
                <p className="text-base leading-tight">Fundamental</p>
                <span className="text-xs text-zinc-400 leading-tight">
                  104 Katakana characters
                </span>
                <span className="text-xs text-zinc-400 leading-tight">
                    10時間 50分 - 1 Week ago
                  </span>
              </div>
            </div>
            <Link
              href={`/quiz/kana/2`}
              className="flex h-fit items-center px-4 py-2 rounded-xl border border-gray-600 flex-grow-0 self-center"
            >
              Start
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
