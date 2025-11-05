import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { generateWithApiKeyRotation } from './geminiService';
import { 
    Setup, ScenePlan, Character, Background, Stats, Scene, LanguageCode, VeoSpeakerId, VisualStyleId, PromptStyleId, FrameLayoutId,
} from '../types';
import { 
    POSES, ACTION_FLOWS, FOLEY_BASE, NEGATIVE_PROMPT, 
    LIP_SYNC_NOTE_TEMPLATE, SUPPORTED_LANGUAGES, PROMPT_STYLES, FRAME_LAYOUTS
} from '../constants';

const countWords = (text: string): number => {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
};

const generateSetupJson = async (
    apiKeys: string[],
    characterDescription: string,
    backgroundDescription: string,
    visualStyle: VisualStyleId
): Promise<Setup> => {
    const schema = {
        type: Type.OBJECT,
        properties: {
            character_lock: {
                type: Type.OBJECT,
                properties: {
                    CHAR_1: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.STRING },
                            name: { type: Type.STRING },
                            species: { type: Type.STRING },
                            gender: { type: Type.STRING },
                            age: { type: Type.STRING },
                            voice_personality: { type: Type.STRING },
                            body_build: { type: Type.STRING },
                            face_shape: { type: Type.STRING },
                            hair: { type: Type.STRING },
                            skin_or_fur_color: { type: Type.STRING },
                            signature_feature: { type: Type.STRING },
                            outfit_top: { type: Type.STRING },
                            outfit_bottom: { type: Type.STRING },
                            helmet_or_hat: { type: Type.STRING },
                            shoes_or_footwear: { type: Type.STRING },
                            props: { type: Type.STRING },
                            body_metrics: { type: Type.STRING },
                        },
                        required: ["id", "name"]
                    }
                }
            },
            background_lock: {
                type: Type.OBJECT,
                properties: {
                    BACKGROUND_1: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.STRING },
                            name: { type: Type.STRING },
                            setting: { type: Type.STRING },
                            scenery: { type: Type.STRING },
                            props: { type: Type.STRING },
                            lighting: { type: Type.STRING },
                        },
                        required: ["id", "name"]
                    }
                }
            }
        },
        required: ["character_lock", "background_lock"]
    };

    const prompt = `
      Based on the following descriptions, generate a JSON object containing character and background details.
      - The character ID MUST be "CHAR_1".
      - The background ID MUST be "BACKGROUND_1".
      - Populate all fields as detailed as possible based on the descriptions. If a detail isn't provided, make a reasonable, professional assumption.

      Character Description: "${characterDescription}"
      Background Description: "${backgroundDescription}"
    `;
    
    const generationFunc = (ai: GoogleGenAI) => ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: schema
        }
    });

    const response = await generateWithApiKeyRotation(apiKeys, generationFunc);
    const jsonResponse = JSON.parse(response.text);
    
    if (!jsonResponse.character_lock?.CHAR_1 || !jsonResponse.background_lock?.BACKGROUND_1) {
        throw new Error("AI failed to generate valid character/background data with required IDs.");
    }
    
    return {
        ...jsonResponse,
        visual_style: visualStyle,
        negative_prompt: NEGATIVE_PROMPT
    };
};

const generateScenePlans = async (apiKeys: string[], inputText: string, language: LanguageCode, promptStyle: PromptStyleId): Promise<ScenePlan[]> => {
    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                scene_text: { type: Type.STRING },
                illustration_prompt: { type: Type.STRING }
            },
            required: ["scene_text", "illustration_prompt"]
        }
    };

    const targetLanguageName = SUPPORTED_LANGUAGES.find(l => l.code === language)?.name || 'the target language';
    const styleDescription = PROMPT_STYLES.find(s => s.id === promptStyle)?.description || 'Visually compelling, cinematic, and often metaphorical.';

    const prompt = `
      You are an AI script processor for a video generation tool. Follow these rules with absolute precision:
      1.  **VERBATIM TRANSLATION**: First, translate the following Vietnamese script into ${targetLanguageName} (${language}). The translation MUST be verbatim (word-for-word) and 100% faithful to the source. DO NOT summarize, interpret, or change the meaning in any way.
      2.  **STRICT SEGMENTATION**: After translating, segment the full translated text into scenes. Each scene's text ('scene_text') MUST contain between 10 and 15 words. This is a strict, non-negotiable rule.
      3.  **LOGICAL SPLITTING**: When segmenting, you MUST split the text at logical and grammatical breakpoints, such as after a comma or at the end of a clause. This ensures each scene sounds natural and complete on its own. Avoid awkward cuts in the middle of a phrase.
      4.  **ILLUSTRATION PROMPT GENERATION**: For EACH segmented scene, you MUST create a corresponding 'illustration_prompt'. The style of this prompt MUST be: **${styleDescription}**. The prompt must NOT describe the speaker and must be in English.
      5.  **OUTPUT FORMAT**: The final output must be a single JSON array of objects, where each object represents a scene and contains 'scene_text' and 'illustration_prompt'.

      Vietnamese Script: "${inputText}"
    `;

    const generationFunc = (ai: GoogleGenAI) => ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: schema
        }
    });

    const response = await generateWithApiKeyRotation(apiKeys, generationFunc);
    const result = JSON.parse(response.text);

    if (!Array.isArray(result) || result.length === 0) {
        throw new Error("AI did not return a valid scene plan array.");
    }
    return result;
};


export const convertScript = async (
    apiKeysString: string,
    characterDescription: string,
    backgroundDescription: string,
    inputText: string,
    voiceInstructions: string,
    aspectRatio: '16:9' | '9:16',
    language: LanguageCode,
    speaker: VeoSpeakerId,
    visualStyle: VisualStyleId,
    promptStyle: PromptStyleId,
    frameLayout: FrameLayoutId
): Promise<{ setupJson: string; scenesJsonl: string; stats: Stats }> => {
    if (!apiKeysString.trim()) throw new Error("Please provide at least one API Key.");
    if (!characterDescription.trim() || !backgroundDescription.trim() || !inputText.trim()) {
        throw new Error("Please fill in character, background, and script descriptions.");
    }

    const apiKeys = apiKeysString.trim().split(/\s+/);
    
    const [setupData, scenePlans] = await Promise.all([
        generateSetupJson(apiKeys, characterDescription, backgroundDescription, visualStyle),
        generateScenePlans(apiKeys, inputText, language, promptStyle)
    ]);

    const character = setupData.character_lock.CHAR_1;
    const background = setupData.background_lock.BACKGROUND_1;
    if (!character) throw new Error("AI could not generate valid character data from the description.");
    if (!background) throw new Error("AI could not generate valid background data from the description.");


    let totalWords = 0;
    let totalDuration = 0;

    const selectedLayout = FRAME_LAYOUTS.find(l => l.id === frameLayout);
    if (!selectedLayout) throw new Error("Invalid frame layout selected.");

    const sceneObjects = scenePlans.map((plan, index): Scene => {
        const wordCount = countWords(plan.scene_text);
        const calculatedDuration = wordCount / 2.5;
        const duration = Math.round(Math.max(3, Math.min(8, calculatedDuration)) * 10) / 10;
        
        totalWords += wordCount;
        totalDuration += duration;
        
        const sceneIndex = index;
        const poseIndex = sceneIndex % POSES.length;
        const actionIndex = sceneIndex % ACTION_FLOWS.length;
        
        const pose = POSES[poseIndex];
        const actionFlow = ACTION_FLOWS[actionIndex];
        
        const layoutPrompt = aspectRatio === '16:9' ? selectedLayout.layout_16_9 : selectedLayout.layout_9_16;
        const finalPrompt = `${layoutPrompt} ${plan.illustration_prompt}`;

        return {
            scene_id: String(sceneIndex + 1),
            duration_sec: duration,
            visual_style: setupData.visual_style,
            negative_prompt: setupData.negative_prompt,
            character_lock: {
                "CHAR_1": {
                    ...character,
                    ...pose,
                    action_flow: actionFlow
                }
            },
            background_lock: {
                "BACKGROUND_1": background
            },
            prompt: finalPrompt,
            foley_and_ambience: FOLEY_BASE,
            dialogue: [{
                speaker: speaker,
                language: language,
                line: plan.scene_text,
                delivery: `${pose.expression}. ${voiceInstructions}`
            }],
            lip_sync_director_note: LIP_SYNC_NOTE_TEMPLATE("CHAR_1", duration)
        };
    });

    const stats: Stats = {
        sceneCount: sceneObjects.length,
        totalDuration: Math.round(totalDuration),
        totalWords: totalWords
    };

    const setupJson = JSON.stringify(setupData, null, 2);
    const scenesJsonl = sceneObjects.map(obj => JSON.stringify(obj)).join('\n');

    return { setupJson, scenesJsonl, stats };
};