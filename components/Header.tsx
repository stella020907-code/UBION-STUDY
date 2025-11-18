
import React from 'react';

export const Header: React.FC = () => (
  <header className="bg-white shadow-md w-full sticky top-0 z-10 border-b border-slate-200">
    <div className="container mx-auto px-4 py-4 flex items-center gap-4">
      <div className="bg-indigo-600 text-white rounded-lg p-2 w-12 h-12 flex items-center justify-center">
        <i className="fa-solid fa-graduation-cap text-2xl"></i>
      </div>
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">학습 개요 및 평가문항 생성 서비스</h1>
        <p className="text-sm text-slate-500">AI로 교육 콘텐츠 제작을 손쉽게</p>
      </div>
    </div>
  </header>
);
