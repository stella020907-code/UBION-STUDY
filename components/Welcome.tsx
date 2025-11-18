
import React from 'react';

export const Welcome: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
    <div className="bg-indigo-100 text-indigo-600 rounded-full p-5 mb-6">
        <i className="fa-solid fa-robot text-5xl"></i>
    </div>
    <h2 className="text-2xl font-bold text-slate-800 mb-2">AI 콘텐츠 분석 준비 완료</h2>
    <p className="text-slate-500 max-w-md">
        왼쪽 입력창에 교육 원고를 입력하고 '콘텐츠 생성' 버튼을 누르면, AI가 분석하여 학습 목표, 키워드, 평가 문항을 이곳에 표시합니다.
    </p>
  </div>
);
