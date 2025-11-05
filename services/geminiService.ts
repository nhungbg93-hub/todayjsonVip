
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export async function generateWithApiKeyRotation(
  apiKeys: string[],
  generationFunc: (ai: GoogleGenAI) => Promise<GenerateContentResponse>
): Promise<GenerateContentResponse> {
  let lastError: any = new Error("No API keys provided.");

  for (const key of apiKeys) {
    if (!key) continue;
    try {
      const ai = new GoogleGenAI({ apiKey: key });
      const response = await generationFunc(ai);
      return response;
    } catch (error) {
      console.warn(`API Key ending in ...${key.slice(-4)} failed. Trying next key.`, error);
      lastError = error;
    }
  }

  throw lastError;
}
