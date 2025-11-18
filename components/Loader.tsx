
import React from 'react';

export const Loader: React.FC = () => (
  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 rounded-xl">
    <i className="fa-solid fa-spinner fa-spin text-4xl text-indigo-600"></i>
    <p className="mt-4 text-slate-600 font-semibold">AI가 원고를 분석하고 있습니다...</p>
    <p className="mt-2 text-sm text-slate-500">잠시만 기다려주세요.</p>
  </div>
);
