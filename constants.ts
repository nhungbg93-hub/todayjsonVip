import { Pose, ActionFlow } from './types';

export const SUPPORTED_LANGUAGES = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'vi-VN', name: 'Vietnamese' },
    { code: 'fr-FR', name: 'French' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'zh-CN', name: 'Chinese (Simplified)' },
    { code: 'hi-IN', name: 'Hindi' },
    { code: 'th-TH', name: 'Thai' },
    { code: 'ko-KR', name: 'Korean' },
    { code: 'it-IT', name: 'Italian' },
    { code: 'de-DE', name: 'German' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'ru-RU', name: 'Russian' },
] as const;

export const VEO_SPEAKERS = [
    // Vietnamese
    { id: 'son', name: 'Sơn (Warm, Male - Vietnamese)' },
    { id: 'mai', name: 'Mai (Clear, Female - Vietnamese)' },
    
    // English (General Purpose)
    { id: 'onyx', name: 'Onyx (Deep, Male - English)' },
    { id: 'nova', name: 'Nova (Warm, Female - English)' },
    { id: 'echo', name: 'Echo (Clear, Male - English)' },
    { id: 'luna', name: 'Luna (Gentle, Female - English)' },
    { id: 'zephyr', name: 'Zephyr (Energetic, Male - English)' },
    { id: 'aurora', name: 'Aurora (Crisp, Female - English)' },
    
    // Japanese
    { id: 'kenji', name: 'Kenji (Calm, Male - Japanese)' },
    { id: 'yumi', name: 'Yumi (Bright, Female - Japanese)' },

    // French
    { id: 'pierre', name: 'Pierre (Sophisticated, Male - French)' },
    { id: 'chloe', name: 'Chloé (Elegant, Female - French)' },

    // Spanish
    { id: 'mateo', name: 'Mateo (Rich, Male - Spanish)' },
    { id: 'sofia', name: 'Sofia (Melodious, Female - Spanish)' },

    // German
    { id: 'klaus', name: 'Klaus (Authoritative, Male - German)' },
    { id: 'heidi', name: 'Heidi (Friendly, Female - German)' },

    // Chinese (Mandarin)
    { id: 'wei', name: 'Wei (Steady, Male - Chinese)' },
    { id: 'lin', name: 'Lin (Graceful, Female - Chinese)' },

    // Russian
    { id: 'dmitri', name: 'Dmitri (Strong, Male - Russian)' },
    { id: 'anya', name: 'Anya (Smooth, Female - Russian)' },

    // Korean
    { id: 'minjun', name: 'Min-jun (Polished, Male - Korean)' },
    { id: 'seoyeon', name: 'Seo-yeon (Cheerful, Female - Korean)' },

    // Hindi
    { id: 'arjun', name: 'Arjun (Resonant, Male - Hindi)' },
    { id: 'priya', name: 'Priya (Sweet, Female - Hindi)' },
] as const;

export const VISUAL_STYLES = [
    "2d_Cartoon",
    "Theatrical_Stage_performance",
    "Pixel_Art_8bit",
    "Experimental_Art_film",
    "Realistic_CGI",
    "Realistic",
    "3D_CGI_Realistic",
    "Anime_Japan",
    "3d_Pixar",
    "CCTV_Found_Footage",
    "Music_Video_Aesthetic",
    "POV_First_person",
    "Vintage_Rentro",
    "Live_action_cinematic",
    "Noir_Black_and_White",
    "Documentary_style",
    "Epic_survival_cinematic",
    "3d_Cartoon",
] as const;

export const PROMPT_STYLES = [
    { id: 'cinematic', name: 'Cinematic & Metaphorical', description: 'Generate prompts that are visually compelling, cinematic, and often metaphorical, creating a rich, evocative visual narrative.' },
    { id: 'dynamic', name: 'Dynamic & Energetic', description: 'Generate prompts with a sense of action, movement, and high energy. Use dynamic camera angles and concepts that convey speed and excitement.' },
    { id: 'emotional', name: 'Emotional & Introspective', description: 'Generate prompts that focus on human emotion, feeling, and introspection. Use concepts like close-ups on expressions, poignant moments, and symbolic imagery related to feelings.' },
    { id: 'documentary', name: 'Documentary & Factual', description: 'Generate prompts that are realistic, grounded, and informative. Focus on clear, factual representations, like data visualizations, infographics, or realistic depictions of concepts.' },
    { id: 'minimalist', name: 'Minimalist & Clean', description: 'Generate prompts that are simple, clean, and symbolic. Use minimal elements, negative space, and strong single-focus concepts to convey the message clearly and elegantly.' },
    { id: 'illustration_2d', name: '2D Illustration', description: 'Generate prompts for clean, stylized 2D vector illustrations. Focus on simple shapes, flat colors, and clear concepts to visually represent the scene\'s topic.' },
    { id: 'illustration_3d', name: '3D Illustration', description: 'Generate prompts for polished 3D rendered illustrations. Describe scenes with depth, realistic lighting, shadows, and tangible textures. The style should feel modern and high-fidelity.' },
    { id: 'illustration_diverse', name: 'Diverse Illustration Styles', description: 'Generate prompts that explore a wide variety of illustration styles, such as watercolor, charcoal sketch, abstract art, or pixel art. The AI should choose a different, suitable style for each scene to create a visually dynamic and varied experience.' }
] as const;

export const FRAME_LAYOUTS = [
    {
        id: 'standard',
        name: 'Standard Layout (1/3 Doctor)',
        layout_16_9: "The doctor, CHAR_1, is framed on the left third of the screen, speaking to the camera against BACKGROUND_1. The right two-thirds of the screen displays an illustrative visual:",
        layout_9_16: "The doctor, CHAR_1, is framed on the top third of the screen, speaking to the camera against BACKGROUND_1. The bottom two-thirds of the screen displays an illustrative visual:"
    },
    {
        id: 'illustration_focus',
        name: 'Illustration Focus (Vertical Inset)',
        layout_16_9: "The doctor, CHAR_1, is framed in a vertical inset on the far left of the screen against BACKGROUND_1, occupying about 25% of the screen width. The main illustrative visual fills the remaining 75% of the screen:",
        layout_9_16: "The doctor, CHAR_1, is framed in a small inset box at the top left of the screen against BACKGROUND_1, occupying a small portion of the screen area. The main illustrative visual fills the majority of the screen below and to the right of the inset:"
    },
    {
        id: 'split_50_50',
        name: 'Split Screen (50/50)',
        layout_16_9: "Split screen. The doctor, CHAR_1, is framed on the left half of the screen, speaking to the camera against BACKGROUND_1. The right half of the screen displays an illustrative visual:",
        layout_9_16: "Split screen. The doctor, CHAR_1, is framed on the top half of the screen, speaking to the camera against BACKGROUND_1. The bottom half of the screen displays an illustrative visual:"
    },
    {
        id: 'full_overlay',
        name: 'Full Frame Doctor (with Overlay)',
        layout_16_9: "Full screen shot of the doctor, CHAR_1, speaking to the camera against BACKGROUND_1. An illustrative visual is overlaid on the scene:",
        layout_9_16: "Full screen shot of the doctor, CHAR_1, speaking to the camera against BACKGROUND_1. An illustrative visual is overlaid on the scene:"
    },
    {
        id: 'black_background_split',
        name: 'Black Background Split',
        layout_16_9: "Split screen against a solid black background. The doctor, CHAR_1, is on the left half of the screen, speaking to the camera. The right half displays textual or illustrative content:",
        layout_9_16: "Split screen against a solid black background. The doctor, CHAR_1, is on the top half of the screen, speaking to the camera. The bottom half displays textual or illustrative content:"
    }
] as const;


export const POSES: Pose[] = [
  { position: "standing centered", orientation: "facing camera", pose: "upright, relaxed posture", foot_placement: "shoulder-width apart", hand_detail: "hands resting at sides", expression: "a calm, neutral expression" },
  { position: "standing slightly off-center", orientation: "three-quarter view to camera", pose: "leaning slightly on one foot", foot_placement: "one foot forward", hand_detail: "one hand gesturing for emphasis", expression: "an engaged, thoughtful expression" },
  { position: "sitting on a stool", orientation: "facing camera directly", pose: "leaning forward slightly", foot_placement: "feet flat on the floor", hand_detail: "hands clasped together", expression: "a sincere, earnest expression" },
  { position: "standing with hands on a desk", orientation: "looking directly at the viewer", pose: "confident, authoritative stance", foot_placement: "firmly planted", hand_detail: "fingers spread on the surface", expression: "a professional, serious expression" },
  { position: "walking slowly towards camera", orientation: "maintaining eye contact", pose: "natural walking motion", foot_placement: "steady gait", hand_detail: "arms swinging gently", expression: "a friendly, approachable expression" },
  { position: "standing with arms crossed", orientation: "facing camera", pose: "contemplative posture", foot_placement: "shoulder-width apart", hand_detail: "arms folded comfortably", expression: "a pensive, reflective expression" },
  { position: "sitting in an office chair", orientation: "angled towards the camera", pose: "relaxed but attentive", foot_placement: "one leg crossed over the other", hand_detail: "one hand on the armrest", expression: "a conversational, open expression" },
  { position: "standing, looking slightly upwards", orientation: "three-quarter view", pose: "hopeful, optimistic posture", foot_placement: "balanced stance", hand_detail: "hands open, palms slightly up", expression: "an inspired, visionary expression" },
];

export const ACTION_FLOWS: ActionFlow[] = [
    { pre_action: "Takes a subtle breath", main_action: "Speaks clearly and directly", post_action: "Gives a slight, reassuring nod" },
    { pre_action: "Adjusts glasses", main_action: "Gestures with one hand to emphasize a point", post_action: "Hand returns to a resting position" },
    { pre_action: "Briefly glances down as if collecting thoughts", main_action: "Looks up and makes direct eye contact while speaking", post_action: "Holds eye contact for a moment after speaking" },
    { pre_action: "Leans forward slightly", main_action: "Speaks with a consistent, measured pace", post_action: "Leans back to a neutral position" },
    { pre_action: "A small, knowing smile appears", main_action: "Delivers the line with a warm tone", post_action: "Smile widens slightly" },
    { pre_action: "Raises eyebrows slightly for emphasis", main_action: "Speaks with conviction", post_action: "Eyebrows return to a neutral position" },
    { pre_action: "Tilts head slightly", main_action: "Speaks in a thoughtful, considerate manner", post_action: "Head straightens" },
    { pre_action: "Clasps hands together", main_action: "Speaks with a sincere tone", post_action: "Unclasps hands" },
];

export const FOLEY_BASE = {
  ambience: [],
  fx: [],
  music: ""
};

export const NEGATIVE_PROMPT = "black bars, letterbox, pillarbox, borders, mattes, padding, blur background, watermark, captions, subtitles, CGI, animated, cartoon, stylized, 3D render";

export const LIP_SYNC_NOTE_TEMPLATE = (characterId: string, duration: number) =>
  `Voice-over must begin IMMEDIATELY at the start of the scene. Direct ${characterId} to deliver the line naturally within the scene's ${duration}-second duration, framed within their portion of the screen. Pacing should be adjusted to fit the line's length. Ensure clear, synchronized mouth movements.`;

export const DEFAULT_VOICE_INSTRUCTIONS = "Deliver with a clear, professional, and empathetic tone. Maintain a moderate volume and a steady pace. Emphasize key medical terms and reassuring phrases.";