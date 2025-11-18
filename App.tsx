
import React, { useState, useCallback } from 'react';
import type { AnalysisResult } from './types';
import { generateEducationalContent } from './services/geminiService';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { Loader } from './components/Loader';
import { ErrorDisplay } from './components/ErrorDisplay';
import { Welcome } from './components/Welcome';

const App: React.FC = () => {
  const [manuscript, setManuscript] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateContent = useCallback(async () => {
    if (!manuscript.trim()) {
      setError('원고를 입력해주세요.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const result = await generateEducationalContent(manuscript);
      setGeneratedContent(result);
    } catch (err) {
      console.error(err);
      setError('콘텐츠 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }, [manuscript]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <InputSection
          manuscript={manuscript}
          setManuscript={setManuscript}
          onGenerate={handleGenerateContent}
          isLoading={isLoading}
        />
        <div className="relative lg:sticky lg:top-8 bg-white rounded-xl shadow-lg border border-slate-200 min-h-[calc(100vh-10rem)]">
          {isLoading && <Loader />}
          {error && <ErrorDisplay message={error} />}
          {generatedContent && !isLoading && !error && <OutputSection data={generatedContent} />}
          {!isLoading && !error && !generatedContent && <Welcome />}
        </div>
      </main>
    </div>
  );
};

export default App;
