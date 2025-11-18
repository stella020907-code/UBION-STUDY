
import React from 'react';
import type { AnalysisResult, MultipleChoiceQuiz, TrueFalseQuiz, ShortAnswerQuiz } from '../types';

interface OutputSectionProps {
  data: AnalysisResult;
}

const SectionCard: React.FC<{ title: string; icon: string; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-700 mb-3 border-b-2 border-indigo-200 pb-2 flex items-center gap-2">
            <i className={`fa-solid ${icon} text-indigo-500`}></i>
            {title}
        </h3>
        {children}
    </div>
);


const QuizCard: React.FC<{ quiz: MultipleChoiceQuiz | TrueFalseQuiz | ShortAnswerQuiz; type: '선다형' | '진위형' | '단답형'; index: number }> = ({ quiz, type, index }) => {
    
    const getTypeInfo = () => {
        switch (type) {
            case '선다형': return { color: 'bg-blue-100 text-blue-800', icon: 'fa-list-check' };
            case '진위형': return { color: 'bg-green-100 text-green-800', icon: 'fa-check-double' };
            case '단답형': return { color: 'bg-yellow-100 text-yellow-800', icon: 'fa-pen-ruler' };
            default: return { color: 'bg-gray-100 text-gray-800', icon: 'fa-question-circle' };
        }
    };
    const typeInfo = getTypeInfo();

    return (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4 transition-shadow hover:shadow-md">
            <div className="flex justify-between items-start mb-2">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${typeInfo.color}`}>
                    <i className={`fa-solid ${typeInfo.icon} mr-1.5`}></i>
                    {type} #{index + 1}
                </span>
            </div>
            <p className="font-semibold text-slate-800 mb-3">{quiz.문제}</p>
            
            {'선택지' in quiz && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {Object.entries(quiz.선택지).map(([key, value]) => (
                        <div key={key} className={`p-2 rounded ${quiz.정답 === key ? 'bg-indigo-100 text-indigo-800 font-bold' : 'bg-slate-100'}`}>
                           {key}. {value}
                        </div>
                    ))}
                </div>
            )}
            
            <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-800 list-none flex items-center">
                    정답 및 해설 보기
                    <i className="fa-solid fa-chevron-down ml-1 transition-transform duration-200 group-open:rotate-180"></i>
                </summary>
                <div className="mt-2 p-3 bg-white rounded-md border border-slate-200">
                    <p className="text-sm font-bold text-slate-700">정답: <span className="text-indigo-700">{quiz.정답}</span></p>
                    <p className="text-sm text-slate-600 mt-1">해설: {quiz.해설}</p>
                </div>
            </details>
        </div>
    );
};


export const OutputSection: React.FC<OutputSectionProps> = ({ data }) => {
  const { 콘텐츠_분석_결과, 평가_문항 } = data;

  return (
    <div className="p-6 h-full overflow-y-auto">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-square-poll-vertical text-indigo-500"></i>
            콘텐츠 분석 결과
        </h2>
        
        <SectionCard title="학습 목표" icon="fa-bullseye">
            <ul className="list-disc list-inside space-y-2 text-slate-700">
                {콘텐츠_분석_결과.학습_목표.map((goal, index) => <li key={index}>{goal}</li>)}
            </ul>
        </SectionCard>

        <SectionCard title="학습 내용 (키워드)" icon="fa-key">
            <div className="flex flex-wrap gap-2">
                {콘텐츠_분석_결과.학습_내용_키워드.map((keyword, index) => (
                    <span key={index} className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">{keyword}</span>
                ))}
            </div>
        </SectionCard>

        <div className="mt-8">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-clipboard-question text-indigo-500"></i>
                생성된 평가 문항
            </h2>
            {평가_문항.선다형_퀴즈.map((q, i) => <QuizCard key={`mc-${i}`} quiz={q} type="선다형" index={i} />)}
            {평가_문항.진위형_퀴즈.map((q, i) => <QuizCard key={`tf-${i}`} quiz={q} type="진위형" index={i} />)}
            {평가_문항.단답형_퀴즈.map((q, i) => <QuizCard key={`sa-${i}`} quiz={q} type="단답형" index={i} />)}
        </div>
    </div>
  );
};
