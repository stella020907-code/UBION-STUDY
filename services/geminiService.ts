
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT, RESPONSE_SCHEMA } from '../constants';
import type { AnalysisResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateEducationalContent(manuscript: string): Promise<AnalysisResult> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: manuscript,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const jsonText = response.text.trim();
    // Basic cleanup if the model wraps the JSON in markdown
    const cleanedJsonText = jsonText.replace(/^```json\n/, '').replace(/\n```$/, '');
    
    const parsedData = JSON.parse(cleanedJsonText);
    return parsedData as AnalysisResult;

  } catch (error) {
    console.error("Error generating content:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate or parse content: ${error.message}`);
    }
    throw new Error('An unknown error occurred during content generation.');
  }
}
