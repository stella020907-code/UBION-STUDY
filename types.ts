
export interface MultipleChoiceQuiz {
  문제: string;
  선택지: {
    "1": string;
    "2": string;
    "3": string;
    "4": string;
  };
  정답: string;
  해설: string;
}

export interface TrueFalseQuiz {
  문제: string;
  정답: '참' | '거짓';
  해설: string;
}

export interface ShortAnswerQuiz {
  문제: string;
  정답: string;
  해설: string;
}

export interface AssessmentItems {
  선다형_퀴즈: MultipleChoiceQuiz[];
  진위형_퀴즈: TrueFalseQuiz[];
  단답형_퀴즈: ShortAnswerQuiz[];
}

export interface ContentAnalysis {
  학습_목표: string[];
  학습_내용_키워드: string[];
}

export interface AnalysisResult {
  콘텐츠_분석_결과: ContentAnalysis;
  평가_문항: AssessmentItems;
}
