
import { Type } from "@google/genai";

export const SYSTEM_PROMPT = `당신은 전문 교육 콘텐츠 개발 및 검수 AI 어시스턴트입니다. 사용자가 제시하는 원고를 철저하게 분석하고, 교육 콘텐츠 제작 표준에 맞춰 학습 목표, 학습 내용, 그리고 평가 문항을 생성해야 합니다.

🎯 임무 및 규칙
1.	역할: 사용자가 제공한 원고를 입력받아, 이를 기반으로 학습 목표, 학습 내용(키워드), 그리고 3가지 유형의 평가 문항을 생성합니다.
2.	학습 목표 생성: 원고의 핵심 내용을 포괄하는 명확한 문장 형태로 1~3개의 학습 목표를 생성합니다. 목표는 반드시 '~할 수 있다' 형식으로 끝나야 합니다.
3.	학습 내용 추출: 원고 내의 주요 개념, 용어, 핵심 키워드를 단어/짧은 구 형태로 추출하여 5~10개 내외의 목록으로 제시합니다.
4.	평가 문항 생성: 아래 명시된 3가지 유형의 퀴즈를 원고 내용에 근거하여 각각 최소 2개 이상 생성합니다. 모든 퀴즈는 정답과 간결한 해설을 포함해야 합니다.
o	선다형: 4지선다 형태로 구성합니다. (정답 1개, 오답 3개)
o	진위형: 제시된 문장이 원고 내용에 근거하여 '참' 또는 '거짓'인지를 판별하는 형태입니다.
o	단답형: 하나의 단어나 짧은 구를 정답으로 하는 빈칸 채우기 또는 직접 질문 형태입니다.
5.	출력 형식: 생성된 모든 결과는 다음의 JSON 형식만을 따르도록 합니다. 다른 어떠한 설명, 인사말, 추가 텍스트 없이 오직 JSON 객체만을 출력해야 합니다.`;

export const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    콘텐츠_분석_결과: {
      type: Type.OBJECT,
      properties: {
        학습_목표: {
          type: Type.ARRAY,
          items: { type: Type.STRING, description: "학습 목표는 '~할 수 있다.' 형식의 문장입니다." },
          description: "원고의 핵심 내용을 바탕으로 생성된 1~3개의 학습 목표 목록입니다."
        },
        학습_내용_키워드: {
          type: Type.ARRAY,
          items: { type: Type.STRING, description: "핵심 키워드는 단어 또는 짧은 구 형태입니다." },
          description: "원고에서 추출된 5~10개의 주요 개념 및 핵심 키워드 목록입니다."
        },
      },
      required: ["학습_목표", "학습_내용_키워드"],
    },
    평가_문항: {
      type: Type.OBJECT,
      properties: {
        선다형_퀴즈: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              문제: { type: Type.STRING, description: "4지선다형 문제의 질문입니다." },
              선택지: {
                type: Type.OBJECT,
                properties: {
                  "1": { type: Type.STRING },
                  "2": { type: Type.STRING },
                  "3": { type: Type.STRING },
                  "4": { type: Type.STRING },
                },
                required: ["1", "2", "3", "4"],
                description: "4개의 선택지입니다."
              },
              정답: { type: Type.STRING, description: "정답 선택지의 번호입니다. (예: '2')" },
              해설: { type: Type.STRING, description: "정답 및 오답에 대한 간결한 설명입니다." },
            },
            required: ["문제", "선택지", "정답", "해설"],
          },
        },
        진위형_퀴즈: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              문제: { type: Type.STRING, description: "참 또는 거짓으로 판별해야 할 문장입니다." },
              정답: { type: Type.STRING, description: "'참' 또는 '거짓' 중 하나입니다." },
              해설: { type: Type.STRING, description: "정답에 대한 원고 근거 설명입니다." },
            },
            required: ["문제", "정답", "해설"],
          },
        },
        단답형_퀴즈: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              문제: { type: Type.STRING, description: "단답형 문제의 질문입니다." },
              정답: { type: Type.STRING, description: "정답이 되는 단어 또는 짧은 구입니다." },
              해설: { type: Type.STRING, description: "정답에 대한 간결한 설명입니다." },
            },
            required: ["문제", "정답", "해설"],
          },
        },
      },
      required: ["선다형_퀴즈", "진위형_퀴즈", "단답형_퀴즈"],
    },
  },
  required: ["콘텐츠_분석_결과", "평가_문항"],
};
