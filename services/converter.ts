
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { generateWithApiKeyRotation } from './geminiService';
import { 
    Setup, ScenePlan, Character, Background, Stats, Scene, LanguageCode, VeoSpeakerId, VisualStyleId, PromptStyleId, FrameLayoutId,
} from '../types';
import { 
    POSES, ACTION_FLOWS, FOLEY_BASE, NEGATIVE_PROMPT, 
    LIP_SYNC_NOTE_TEMPLATE, SUPPORTED_LANGUAGES, PROMPT_STYLES, FRAME_LAYOUTS,
    CHARACTER_CONSISTENCY_PROMPT_BLOCK, VEO_SPEAKERS
} from '../constants';

interface CharacterImage {
    data: string;
    mimeType: string;
}

const countWords = (text: string): number => {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
};

const generateSetupJson = async (
    apiKeys: string[],
    characterDescription: string,
    backgroundDescription: string,
    visualStyle: VisualStyleId,
    characterImage: CharacterImage | null
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

    const generationFunc = (ai: GoogleGenAI) => {
        let prompt: string;
        let contents: any;

        if (characterImage) {
            prompt = `
              You are a meticulous digital modeler creating a JSON description of a character from a reference image. Your work requires forensic-level attention to detail. Any deviation from the reference image is a critical failure.

              **PRIMARY DIRECTIVE: The provided image is the *only* source of truth for all visual attributes. Your task is to perform a detailed visual analysis of the image and translate it into the structured JSON format. The text description is secondary and should only be used for non-visual data.**

              **Step-by-Step Analysis & Population Process:**

              1.  **Forensic Image Analysis:**
                  *   Examine the character in the image from head to toe.
                  *   Identify face shape, skin tone (be specific), eye color, and any unique features like moles, scars, or smile lines.
                  *   Analyze the hair: exact color, style (e.g., 'parted on the left', 'wavy texture'), length.
                  *   Observe the clothing: describe each item with extreme detail (e.g., 'a royal blue V-neck scrub top', 'a pristine white lab coat with notched lapels'). Note every button, collar style, and fabric texture you can infer.
                  *   Identify all accessories: glasses (style, color), jewelry, badges, stethoscopes. Be precise.
                  *   Infer body build and posture from the image.

              2.  **JSON Population:**
                  *   Based **exclusively** on your visual analysis from Step 1, populate every visual field in the \`character_lock.CHAR_1\` object.
                  *   For fields like \`name\`, \`age\`, \`gender\`, \`species\`, \`voice_personality\`, you may refer to the provided "Character Description" text.
                  *   **CRITICAL RULE: THE IMAGE ALWAYS WINS.** If the text description contains a visual detail (e.g., "hair color: blonde") that CONTRADICTS the image (e.g., character has brown hair), you MUST ignore the contradictory text and describe what you see in the image.

              3.  **Background Population:**
                  *   Completely ignore the character and the image. Read ONLY the "Background Description" text and populate the \`background_lock.BACKGROUND_1\` object.

              --- CHARACTER DESCRIPTION (for non-visuals & supplemental info) ---
              "${characterDescription}"
              --- END CHARACTER DESCRIPTION ---

              --- BACKGROUND DESCRIPTION (independent task) ---
              "${backgroundDescription}"
              --- END BACKGROUND DESCRIPTION ---

              **Final Check:** Before outputting the JSON, re-verify that every visual detail in the \`CHAR_1\` object is a direct, factual description of the character in the image. The goal is a perfect, 1-to-1 digital replication.
            `;
            const imagePart = {
                inlineData: {
                    mimeType: characterImage.mimeType,
                    data: characterImage.data,
                },
            };
            const textPart = { text: prompt };
            contents = { parts: [textPart, imagePart] };

        } else {
            prompt = `
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
            contents = prompt;
        }
    
        return ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema
            }
        });
    };

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

const generateScenePlans = async (
    apiKeys: string[], 
    inputText: string, 
    sourceLanguage: LanguageCode, 
    language: LanguageCode, 
    promptStyle: PromptStyleId, 
    visualStyle: VisualStyleId,
    frameLayout: FrameLayoutId,
    voiceInstructions: string
): Promise<ScenePlan[]> => {
    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                scene_text: { type: Type.STRING },
                illustration_prompt: { type: Type.STRING },
                character_action: { type: Type.STRING },
                character_expression: { type: Type.STRING },
                cinematography: { type: Type.STRING },
                audio_cue: { type: Type.STRING },
            },
            required: ["scene_text", "illustration_prompt", "character_action", "character_expression", "cinematography", "audio_cue"]
        }
    };

    const chunks = inputText.split(/\n\s*\n/).filter(chunk => chunk.trim() !== '');
    if (chunks.length === 0) throw new Error("Input script is empty or contains only whitespace.");

    const processChunk = async (chunk: string): Promise<ScenePlan[]> => {
        const sourceLanguageName = SUPPORTED_LANGUAGES.find(l => l.code === sourceLanguage)?.name || 'the source language';
        const targetLanguageName = SUPPORTED_LANGUAGES.find(l => l.code === language)?.name || 'the target language';
        const styleDescription = PROMPT_STYLES.find(s => s.id === promptStyle)?.description || 'Visually compelling.';
        const needsTranslation = sourceLanguage !== language;
        const visualStyleName = visualStyle.replace(/_/g, ' ');
        const layoutName = FRAME_LAYOUTS.find(l => l.id === frameLayout)?.name || 'standard framing';

        const instructions = [
            needsTranslation 
                ? `**TRANSLATION & SEGMENTATION**: First, translate the text from ${sourceLanguageName} into ${targetLanguageName} (${language}). The translation must be verbatim. THEN, segment the translated text into scenes. Each 'scene_text' must be a natural, complete phrase, clause, or short sentence, strictly between 10 and 20 words.`
                : `**SEGMENTATION**: Directly segment the original text into scenes. Each 'scene_text' must be a natural, complete phrase, clause, or short sentence, strictly between 10 and 20 words.`,
            `**SCENE GENERATION**: For EACH segmented scene, you MUST generate a complete JSON object with the following fields:`,
            `  - **scene_text**: The processed (translated, if applicable) and segmented dialogue for the scene.`,
            `  - **illustration_prompt**: A creative, visual description for the illustrative part of the frame. This prompt MUST be in English. Adhere to this style: **${styleDescription}**. The visuals MUST be compatible with the master style: **'${visualStyleName}'**. Do not describe the main character/speaker.`,
            `  - **character_action**: A concise description of the main character's physical action and pose. Example: 'stands centered, calm and confident, speaking directly to camera'.`,
            `  - **character_expression**: A brief description of the character's facial expression, reflecting the emotion of the 'scene_text'. Example: 'a calm, neutral expression', 'an engaged, thoughtful expression'.`,
            `  - **cinematography**: A professional cinematography directive, including framing, shot type, and camera movement. The framing MUST be consistent with the **'${layoutName}'** concept. Example: 'Left-third framing, medium shot, smooth dolly-in'.`,
            `  - **audio_cue**: A brief description of the ambient sound, foley, or music for the scene. Example: 'Subtle office ambience, gentle heartbeat tone'.`,
            `**CONSISTENCY**: The character's action and expression MUST align with the dialogue in 'scene_text' and the overall vocal delivery style: **'${voiceInstructions}'**.`,
            `**OUTPUT FORMAT**: The final output must be a single JSON array of these scene objects.`
        ].filter(Boolean) as string[];

        const numberedInstructions = instructions.map((inst, index) => `${index + 1}. ${inst}`).join('\n');

        const prompt = `
          You are an AI video director's assistant. Your task is to process a script chunk into a structured scene plan. Follow these rules with absolute precision:
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
                return [];
            }
            return result;
        } catch (error) {
            console.error(`Failed to process chunk: "${chunk.substring(0, 50)}..."`, error);
            return [];
        }
    };

    const allScenePlanArrays = await Promise.all(chunks.map(chunk => processChunk(chunk)));
    const finalScenePlans = allScenePlanArrays.flat();

    if (finalScenePlans.length === 0) {
        throw new Error("AI failed to generate any valid scene plans from the script. Check API keys and script format.");
    }

    return finalScenePlans;
};


export const convertScript = async (
    apiKeysString: string,
    characterDescription: string,
    backgroundDescription: string,
    characterImage: CharacterImage | null,
    inputText: string,
    voiceInstructions: string,
    acousticEnvironment: string,
    aspectRatio: '16:9' | '9:16',
    sourceLanguage: LanguageCode,
    language: LanguageCode,
    speaker: VeoSpeakerId,
    visualStyle: VisualStyleId,
    promptStyle: PromptStyleId,
    frameLayoutId: FrameLayoutId
): Promise<{ setupJson: string; scenesJsonl: string; stats: Stats }> => {
    if (!apiKeysString.trim()) throw new Error("Please provide at least one API Key.");
    if (!characterDescription.trim() || !backgroundDescription.trim() || !inputText.trim()) {
        throw new Error("Please fill in character, background, and script descriptions.");
    }

    const apiKeys = apiKeysString.trim().split(/\s+/);
    
    const [setupData, scenePlans] = await Promise.all([
        generateSetupJson(apiKeys, characterDescription, backgroundDescription, visualStyle, characterImage),
        generateScenePlans(apiKeys, inputText, sourceLanguage, language, promptStyle, visualStyle, frameLayoutId, voiceInstructions)
    ]);

    const character = setupData.character_lock.CHAR_1;
    const background = setupData.background_lock.BACKGROUND_1;
    if (!character) throw new Error("AI could not generate valid character data from the description.");
    if (!background) throw new Error("AI could not generate valid background data from the description.");


    let totalWords = 0;
    let totalDuration = 0;

    const scenePrompts = scenePlans.map((plan, index) => {
        const wordCount = countWords(plan.scene_text);
        const duration = Math.round(Math.max(3, Math.min(8, wordCount / 2.5)) * 10) / 10;
        totalWords += wordCount;
        totalDuration += duration;
        
        const langName = SUPPORTED_LANGUAGES.find(l => l.code === language)?.name.split(' ')[0] || 'English';
        const speakerName = VEO_SPEAKERS.find(s => s.id === speaker)?.name.split(' ')[0] || speaker;

        const charSummary = `${character.name} (${character.age}, ${character.hair}, ${character.outfit_top})`;

        // 1. Start with the critical character consistency block
        const consistencyBlock = CHARACTER_CONSISTENCY_PROMPT_BLOCK(character.name);
        
        // 2. Get the directorial framing instruction from the selected layout
        // FIX: Added a fallback to the first layout to prevent type errors and ensure a valid layout is always found.
        const frameLayout = FRAME_LAYOUTS.find(l => l.id === frameLayoutId) || FRAME_LAYOUTS[0];
        const layoutInstruction = aspectRatio === '16:9' ? frameLayout.layout_16_9 : frameLayout.layout_9_16;
        
        // 3. Inject the dynamic illustration prompt into the layout instruction
        const fullVisualDescription = layoutInstruction + " " + plan.illustration_prompt;

        // 4. Assemble the final prompt with clear sections
        const scenePromptLines = [
            consistencyBlock,
            `🎬 **SCENE DESCRIPTION**:`,
            fullVisualDescription,
            `---`,
            `🗣️ **DIALOGUE & PERFORMANCE**`,
            `**Line**: "${plan.scene_text}"`,
            `**Speaker**: ${speakerName} (${langName})`,
            `**Character Action**: ${plan.character_action}`,
            `**Delivery**: ${plan.character_expression}. ${voiceInstructions}`,
            `---`,
            `🎥 **TECHNICALS**`,
            `**Scene ID**: Scene_${String(index + 1).padStart(2, '0')}`,
            `**Style**: ${setupData.visual_style.replace(/_/g, ' ')}`,
            `**Cinematography**: ${plan.cinematography}`,
            `**Audio**: ${plan.audio_cue}`,
            `**Acoustics**: ${acousticEnvironment}`,
            `**Negative Prompts**: no subtitle, no overlay, no text over.`
        ];

        return scenePromptLines.join('\n');
    });


    const stats: Stats = {
        sceneCount: scenePlans.length,
        totalDuration: Math.round(totalDuration),
        totalWords: totalWords
    };

    const setupJson = JSON.stringify(setupData, null, 2);
    const scenesJsonl = scenePrompts.map(prompt => JSON.stringify({ prompt, status: 'pending' })).join('\n');

    return { setupJson, scenesJsonl, stats };
};
