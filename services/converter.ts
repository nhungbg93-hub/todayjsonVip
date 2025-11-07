import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { generateWithApiKeyRotation } from './geminiService';
import { 
    Setup, ScenePlan, Character, Background, Stats, Scene, LanguageCode, VeoSpeakerId, VisualStyleId, PromptStyleId, FrameLayoutId,
} from '../types';
import { 
    POSES, ACTION_FLOWS, FOLEY_BASE, NEGATIVE_PROMPT, 
    LIP_SYNC_NOTE_TEMPLATE, SUPPORTED_LANGUAGES, PROMPT_STYLES, FRAME_LAYOUTS,
    CHARACTER_CONSISTENCY_PROMPT_BLOCK
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
      You are an AI assistant that populates a JSON object from separate character and background descriptions.
      **CRITICAL RULE**: Process the Character Description and Background Description as two completely independent tasks. The background details MUST NOT influence the character's appearance, clothing, or properties. The character's details MUST NOT influence the background.

      Follow these steps:
      1. Read ONLY the "Character Description" and fill out all fields for the character with ID "CHAR_1".
      2. Read ONLY the "Background Description" and fill out all fields for the background with ID "BACKGROUND_1".
      3. Populate all fields as detailed as possible. If a detail isn't provided in its specific section, make a reasonable, professional assumption that fits that section's context ONLY.

      --- CHARACTER DESCRIPTION ---
      "${characterDescription}"
      --- END CHARACTER DESCRIPTION ---

      --- BACKGROUND DESCRIPTION ---
      "${backgroundDescription}"
      --- END BACKGROUND DESCRIPTION ---
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

const generateScenePlans = async (apiKeys: string[], inputText: string, sourceLanguage: LanguageCode, language: LanguageCode, promptStyle: PromptStyleId, visualStyle: VisualStyleId): Promise<ScenePlan[]> => {
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

    // 1. Split the input text into manageable chunks (e.g., by paragraphs).
    const chunks = inputText.split(/\n\s*\n/).filter(chunk => chunk.trim() !== '');
    if (chunks.length === 0) {
        throw new Error("Input script is empty or contains only whitespace.");
    }

    // 2. Create a processing function for a single chunk.
    const processChunk = async (chunk: string): Promise<ScenePlan[]> => {
        const sourceLanguageName = SUPPORTED_LANGUAGES.find(l => l.code === sourceLanguage)?.name || 'the source language';
        const targetLanguageName = SUPPORTED_LANGUAGES.find(l => l.code === language)?.name || 'the target language';
        const styleDescription = PROMPT_STYLES.find(s => s.id === promptStyle)?.description || 'Visually compelling, cinematic, and often metaphorical.';
        const needsTranslation = sourceLanguage !== language;
        const visualStyleName = visualStyle.replace(/_/g, ' ');

        const instructions = [
            needsTranslation && `**VERBATIM TRANSLATION**: First, translate the following ${sourceLanguageName} text chunk into ${targetLanguageName} (${language}). The translation MUST be verbatim (word-for-word) and 100% faithful to the source. DO NOT summarize, interpret, or change the meaning.`,
            `**STRICT SEGMENTATION**: After any necessary translation, segment the full text into scenes. Each scene's text ('scene_text') MUST contain between 10 and 15 words. This is a strict, non-negotiable rule.`,
            `**LOGICAL SPLITTING**: When segmenting, you MUST split the text at logical and grammatical breakpoints, such as after a comma or at the end of a clause. This ensures each scene sounds natural and complete on its own. Avoid awkward cuts.`,
            `**ILLUSTRATION PROMPT GENERATION**: For EACH segmented scene, you MUST create a corresponding 'illustration_prompt'. The style of this prompt MUST be: **${styleDescription}**. The prompt must NOT describe the speaker and must be in English.`,
            `**VISUAL STYLE ADHERENCE**: Critically, the 'illustration_prompt' MUST be described in a way that is fully compatible with the video's master visual style, which is **"${visualStyleName}"**. For example, if the master style is "Anime Japan", the illustration prompt should describe an anime-style scene, not a photorealistic one.`,
            `**OUTPUT FORMAT**: The final output must be a single JSON array of objects, where each object represents a scene and contains 'scene_text' and 'illustration_prompt'.`
        ].filter(Boolean) as string[];

        const numberedInstructions = instructions.map((inst, index) => `${index + 1}. ${inst}`).join('\n');

        const prompt = `
          You are an AI script processor for a video generation tool. Follow these rules with absolute precision for the provided text chunk:
          ${numberedInstructions}

          Text Chunk to process: "${chunk}"
        `;

        const generationFunc = (ai: GoogleGenAI) => ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema
            }
        });
        
        try {
            const response = await generateWithApiKeyRotation(apiKeys, generationFunc);
            const result = JSON.parse(response.text);

            if (!Array.isArray(result)) {
                console.warn("AI did not return a valid array for chunk:", chunk, "Received:", result);
                return []; // Return empty array for failed chunks to avoid breaking the whole process
            }
            return result;
        } catch (error) {
            console.error(`Failed to process chunk: "${chunk.substring(0, 50)}..."`, error);
            // Decide if you want to throw or return empty. Returning empty makes it more resilient.
            return [];
        }
    };

    // 3. Process all chunks in parallel.
    const allScenePlanArrays = await Promise.all(chunks.map(chunk => processChunk(chunk)));
    
    // 4. Flatten the array of arrays into a single array.
    const finalScenePlans = allScenePlanArrays.flat();

    if (finalScenePlans.length === 0) {
        throw new Error("AI failed to generate any valid scene plans from the provided script. This might be due to an API key issue or an invalid script format.");
    }

    return finalScenePlans;
};


export const convertScript = async (
    apiKeysString: string,
    characterDescription: string,
    backgroundDescription: string,
    inputText: string,
    voiceInstructions: string,
    aspectRatio: '16:9' | '9:16',
    sourceLanguage: LanguageCode,
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
        generateScenePlans(apiKeys, inputText, sourceLanguage, language, promptStyle, visualStyle)
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
        const consistencyBlock = CHARACTER_CONSISTENCY_PROMPT_BLOCK(character.name || "CHAR_1");
        const finalPrompt = `${consistencyBlock}\n🎬 **SCENE DESCRIPTION**:\n${layoutPrompt} ${plan.illustration_prompt}`;

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