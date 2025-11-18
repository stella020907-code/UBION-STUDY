
import React from 'react';

interface InputSectionProps {
  manuscript: string;
  setManuscript: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ manuscript, setManuscript, onGenerate, isLoading }) => {
  return (
    <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
            <i className="fa-solid fa-file-alt text-indigo-500"></i>
            1. 원고 입력
        </h2>
        <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-200">
            <textarea
                value={manuscript}
                onChange={(e) => setManuscript(e.target.value)}
                placeholder="이곳에 분석할 교육 원고를 붙여넣으세요..."
                className="w-full h-96 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200 resize-y"
                disabled={isLoading}
            />
        </div>
        <button
            onClick={onGenerate}
            disabled={isLoading || !manuscript.trim()}
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center gap-2 text-lg"
        >
            {isLoading ? (
                <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    생성 중...
                </>
            ) : (
                <>
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                    콘텐츠 생성
                </>
            )}
        </button>
    </div>
  );
};
