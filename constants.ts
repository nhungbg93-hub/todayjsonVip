
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
    // A. VISUAL AESTHETICS
    { id: 'cinematic', name: 'Cinematic & Metaphorical', description: 'Generate prompts that are visually compelling, cinematic, and often metaphorical, creating a rich, evocative visual narrative.' },
    { id: 'dynamic', name: 'Dynamic & Energetic', description: 'Generate prompts with a sense of action, movement, and high energy. Use dynamic camera angles and concepts that convey speed and excitement.' },
    { id: 'emotional', name: 'Emotional & Introspective', description: 'Generate prompts that focus on human emotion, feeling, and introspection. Use concepts like close-ups on expressions, poignant moments, and symbolic imagery related to feelings.' },
    { id: 'documentary', name: 'Documentary & Factual', description: 'Generate prompts that are realistic, grounded, and informative. Focus on clear, factual representations, like data visualizations, infographics, or realistic depictions of concepts.' },
    { id: 'minimalist', name: 'Minimalist & Clean', description: 'Generate prompts that are simple, clean, and symbolic. Use minimal elements, negative space, and strong single-focus concepts to convey the message clearly and elegantly.' },
    { id: 'vibrant_colorful', name: 'Vibrant & Colorful', description: 'Generate prompts with bold, bright, eye-catching colors. Use vivid hues, strong color contrasts, and energetic color palettes.' },
    { id: 'mystery_intrigue', name: 'Mystery & Intrigue', description: 'Generate prompts that create curiosity and suspense. Use partial reveals, shadowy elements, question marks, mysterious symbols, or "what if" scenarios.' },

    // B. ILLUSTRATION STYLES
    { id: 'illustration_2d', name: '2D Illustration', description: 'Generate prompts for clean, stylized 2D vector illustrations. Focus on simple shapes, flat colors, and clear concepts to visually represent the scene\'s topic.' },
    { id: 'illustration_3d', name: '3D Illustration', description: 'Generate prompts for polished 3D rendered illustrations. Describe scenes with depth, realistic lighting, shadows, and tangible textures. The style should feel modern and high-fidelity.' },
    { id: 'illustration_diverse', name: 'Diverse Illustration Styles', description: 'Generate prompts that explore a wide variety of illustration styles, such as watercolor, charcoal sketch, abstract art, or pixel art. The AI should choose a different, suitable style for each scene to create a visually dynamic and varied experience.' },
    
    // C. NARRATIVE TECHNIQUES
    { id: 'storytelling', name: 'Storytelling & Narrative', description: 'Generate prompts that tell a visual story. Use sequential imagery, cause-and-effect visuals, before-and-after comparisons, or journey metaphors.' },
    { id: 'contrast_comparison', name: 'Contrast & Comparison', description: 'Generate prompts that show clear before/after, old/new, wrong/right, or problem/solution contrasts. Use split-screen concepts, side-by-side visuals, or transformation sequences.' },
    { id: 'symbolic_metaphor', name: 'Symbolic & Metaphorical', description: 'Generate prompts that use powerful symbols and metaphors. Use visual analogies, iconic imagery, universal symbols (light/dark, up/down, growth/decay).'},
    { id: 'surprise_unexpected', name: 'Surprise & Unexpected', description: 'Generate prompts that subvert expectations and surprise viewers. Use unexpected combinations, surreal juxtapositions, plot twists, or "mind-blown" moments.'},
    { id: 'social_relatable', name: 'Social & Relatable', description: 'Generate prompts that show everyday situations, common experiences, and relatable moments. Use familiar settings, everyday objects, real-life scenarios, or "you know that feeling when..." visuals.'},

    // D. SPECIALIZED PURPOSES
    { id: 'humor_playful', name: 'Humorous & Playful', description: 'Generate prompts with a lighthearted, humorous, or playful tone. Use funny situations, witty visual gags, or charming and amusing concepts.'},
    { id: 'epic_grand', name: 'Epic & Grand Scale', description: 'Generate prompts that convey a sense of epic scale, grandeur, and awe. Use vast landscapes, sweeping camera shots, and powerful, monumental imagery.'},
    { id: 'futuristic_tech', name: 'Futuristic & Tech-Forward', description: 'Generate prompts with a futuristic, high-tech aesthetic. Use concepts like holograms, advanced robotics, sleek interfaces, and science-fiction-inspired visuals.'},
    { id: 'natural_organic', name: 'Natural & Organic', description: 'Generate prompts that focus on nature, organic shapes, and earthy textures. Use imagery of plants, animals, natural landscapes, and materials like wood and stone.'},
    { id: 'retro_vintage', name: 'Retro & Vintage', description: 'Generate prompts with a nostalgic, retro, or vintage feel. Use aesthetics from specific decades (e.g., 80s neon, 50s pastels), old film effects, and classic design elements.'},
    { id: 'action_packed', name: 'Action-Packed & Intense', description: 'Generate prompts that are filled with high-stakes action, intensity, and tension. Use concepts like explosions, chases, dramatic confrontations, and fast-paced editing cues.'},
    { id: 'educational_clear', name: 'Educational & Crystal Clear', description: 'Generate prompts that are designed for maximum clarity and educational impact. Use clear diagrams, step-by-step visualizations, and straightforward, easy-to-understand concepts.'},
    { id: 'warm_friendly', name: 'Warm & Friendly', description: 'Generate prompts that evoke a feeling of warmth, friendliness, and comfort. Use soft lighting, welcoming scenes, smiling faces, and a generally positive and approachable atmosphere.'},
    { id: 'luxury_premium', name: 'Luxury & Premium', description: 'Generate prompts that convey a sense of luxury, elegance, and high quality. Use sophisticated color palettes, premium materials, clean compositions, and a refined, high-end aesthetic.'}
] as const;

export const FRAME_LAYOUTS = [
    {
        id: 'standard',
        name: 'Standard Layout (1/3 Doctor)',
        layout_16_9: "The doctor, CHAR_1, is framed on the left third of the screen, speaking to the camera against BACKGROUND_1. The right two-thirds of the screen displays an illustrative visual:",
        layout_9_16: "The doctor, CHAR_1, is framed on the top third of the screen, speaking to the camera against BACKGROUND_1. The bottom two-thirds of the screen displays an illustrative visual:"
    },
    {
        id: 'parallel_mix',
        name: 'Parallel Mix (70/30 Split)',
        layout_16_9: "Parallel content composition. The expert, CHAR_1, is the primary focus, occupying the left 70% of the screen against BACKGROUND_1. The right 30% displays a complementary, simultaneous illustrative visual. The visual is:",
        layout_9_16: "Parallel content composition. The expert, CHAR_1, is the primary focus, occupying the top 70% of the screen against BACKGROUND_1. The bottom 30% displays a complementary, simultaneous illustrative visual. The visual is:"
    },
    {
        id: 'illustration_focus',
        name: 'Illustration Focus (Vertical Inset)',
        layout_16_9: "The doctor, CHAR_1, is framed in a vertical inset on the far left of the screen against BACKGROUND_1, occupying about 25% of the screen width. The main illustrative visual fills the remaining 75% of the screen:",
        layout_9_16: "The doctor, CHAR_1, is framed in a small inset box at the top left of the screen against BACKGROUND_1, occupying a small portion of the screen area. The main illustrative visual fills the majority of the screen below and to the right of the inset:"
    },
    {
        id: 'minhhoa_3_4',
        name: 'Illustration 3/4 (Vertical Bar)',
        layout_16_9: "Asymmetrical layout. The main illustrative visual occupies the left 75% of the screen. The expert, CHAR_1, is framed in a vertical bar on the right 25% of the screen, speaking against BACKGROUND_1. The main visual is:",
        layout_9_16: "Asymmetrical layout. The main illustrative visual occupies the bottom 75% of the screen. The expert, CHAR_1, is framed in a horizontal bar on the top 25% of the screen, speaking against BACKGROUND_1. The main visual is:"
    },
    {
        id: 'split_50_50',
        name: 'Split Screen (50/50)',
        layout_16_9: "Split screen. The doctor, CHAR_1, is framed on the left half of the screen, speaking to the camera against BACKGROUND_1. The right half of the screen displays an illustrative visual:",
        layout_9_16: "Split screen. The doctor, CHAR_1, is framed on the top half of the screen, speaking to the camera against BACKGROUND_1. The bottom half of the screen displays an illustrative visual:"
    },
    {
        id: 'diagonal_split',
        name: 'Diagonal Split',
        layout_16_9: "A dynamic diagonal split-screen. The top-left portion shows the expert, CHAR_1, speaking against BACKGROUND_1. The bottom-right portion shows the illustrative visual. The visual is:",
        layout_9_16: "A dynamic diagonal split-screen. The top-left portion shows the expert, CHAR_1, speaking against BACKGROUND_1. The bottom-right portion shows the illustrative visual. The visual is:"
    },
    {
        id: 'minhhoa_tren',
        name: 'Illustration Above (60/40 Split)',
        layout_16_9: "Vertical stacked composition. The top 60% of the screen is dedicated to the illustrative visual. The bottom 40% of the screen is a full-width shot of the expert, CHAR_1, speaking against BACKGROUND_1. The top visual is:",
        layout_9_16: "Vertical stacked composition. The top 60% of the screen is dedicated to the illustrative visual. The bottom 40% of the screen is a full-width shot of the expert, CHAR_1, speaking against BACKGROUND_1. The top visual is:"
    },
    {
        id: 'full_overlay',
        name: 'Full Frame Doctor (with Overlay)',
        layout_16_9: "Full screen shot of the doctor, CHAR_1, speaking to the camera against BACKGROUND_1. An illustrative visual is overlaid on the scene:",
        layout_9_16: "Full screen shot of the doctor, CHAR_1, speaking to the camera against BACKGROUND_1. An illustrative visual is overlaid on the scene:"
    },
    {
        id: 'background_integration',
        name: 'Background Integration (News Style)',
        layout_16_9: "The expert, CHAR_1, is the main focus in the foreground. The background is replaced entirely by the illustrative visual, creating a dynamic, news-broadcast style presentation:",
        layout_9_16: "The expert, CHAR_1, is the main focus in the foreground. The background is replaced entirely by the illustrative visual, creating a dynamic, news-broadcast style presentation:"
    },
     {
        id: 'minhhoa_sau',
        name: 'Illustration Behind (Centered Expert)',
        layout_16_9: "Layered composition. The illustrative visual fills the entire screen as the background. In the foreground, the expert, CHAR_1, is positioned in a smaller frame at the top-center (approx. 40% width x 35% height), speaking against BACKGROUND_1. The background illustration is:",
        layout_9_16: "Layered composition. The illustrative visual fills the entire screen as the background. In the foreground, the expert, CHAR_1, is positioned in a smaller frame at the top-center (approx. 60% width x 30% height), speaking against BACKGROUND_1. The background illustration is:"
    },
    {
        id: 'illustration_takeover',
        name: 'Illustration Takeover (Voice-over)',
        layout_16_9: "This scene is a FULL-SCREEN illustrative visual. The expert CHAR_1 IS NOT VISIBLE, their voice continues as a narrative voice-over. The visual should be a compelling, documentary-style depiction of the following:",
        layout_9_16: "This scene is a FULL-SCREEN illustrative visual. The expert CHAR_1 IS NOT VISIBLE, their voice continues as a narrative voice-over. The visual should be a compelling, documentary-style depiction of the following:"
    },
    {
        id: 'pip_dynamic',
        name: 'Picture-in-Picture (Dynamic)',
        layout_16_9: "Full screen shot of the expert, CHAR_1, speaking against BACKGROUND_1. A smaller illustrative visual appears in a picture-in-picture frame (e.g., top right corner) to highlight key points:",
        layout_9_16: "Full screen shot of the expert, CHAR_1, speaking against BACKGROUND_1. A smaller illustrative visual appears in a picture-in-picture frame (e.g., top right corner) to highlight key points:"
    },
    {
        id: 'pip_corner',
        name: 'Picture-in-Picture (Corner)',
        layout_16_9: "Full-screen illustrative visual. The expert, CHAR_1, appears in a small picture-in-picture box in the bottom-right corner (approx. 15% of screen size), speaking to camera against BACKGROUND_1. The main visual is:",
        layout_9_16: "Full-screen illustrative visual. The expert, CHAR_1, appears in a small picture-in-picture box in the top-left corner (approx. 12% of screen size), speaking to camera against BACKGROUND_1. The main visual is:"
    },
    {
        id: 'visual_emphasis',
        name: 'Visual Emphasis (Quick Punch-in)',
        layout_16_9: "Full screen shot of the expert, CHAR_1, speaking against BACKGROUND_1. The illustrative visual is a quick, punchy overlay or very brief cutaway that appears for only 1-2 seconds to emphasize a key concept, then disappears:",
        layout_9_16: "Full screen shot of the expert, CHAR_1, speaking against BACKGROUND_1. The illustrative visual is a quick, punchy overlay or very brief cutaway that appears for only 1-2 seconds to emphasize a key concept, then disappears:"
    },
    {
        id: 'floating_frame',
        name: 'Floating Frame (3D Depth)',
        layout_16_9: "Layered composition with a 3D depth effect. The illustrative visual serves as the full background layer. In the foreground, the expert, CHAR_1, is presented within a clean, rectangular floating frame on the left third of the screen, complete with a subtle drop shadow. The expert speaks to camera against BACKGROUND_1 within this frame. The background illustration is:",
        layout_9_16: "Layered composition with a 3D depth effect. The illustrative visual serves as the full background layer. In the foreground, the expert, CHAR_1, is presented within a clean, rectangular floating frame on the top third of the screen, complete with a subtle drop shadow. The expert speaks to camera against BACKGROUND_1 within this frame. The background illustration is:"
    },
    {
        id: 'cinematic_letterbox',
        name: 'Cinematic Letterbox',
        layout_16_9: "A cinematic widescreen composition with black letterbox bars at the top and bottom (2.35:1 aspect ratio). Within this widescreen frame, the illustrative visual is displayed. The expert, CHAR_1, is subtly integrated or appears in a small portion of the frame against BACKGROUND_1. The main widescreen visual is:",
        layout_9_16: "A cinematic composition with black letterbox bars at the top and bottom. Within this frame, the illustrative visual is displayed. The expert, CHAR_1, is subtly integrated or appears in a small portion of the frame against BACKGROUND_1. The main visual is:"
    },
    {
        id: 'minimal_corner',
        name: 'Minimalist Corner',
        layout_16_9: "Ultra-minimalist composition. The illustrative visual dominates 90% of the screen with a clean design and generous negative space. The expert, CHAR_1, appears in a tiny circular frame in the bottom-left corner (approx. 10% of screen size), speaking against BACKGROUND_1. The main illustration is:",
        layout_9_16: "Ultra-minimalist composition. The illustrative visual dominates 90% of the screen with a clean design and generous negative space. The expert, CHAR_1, appears in a tiny circular frame in the top-left corner (approx. 10% of screen size), speaking against BACKGROUND_1. The main illustration is:"
    },
    {
        id: 'triple_panel',
        name: 'Triple Panel',
        layout_16_9: "An information-rich triple panel layout. The screen is divided into three vertical sections. The left panel shows the expert, CHAR_1, against BACKGROUND_1. The middle and right panels display two related illustrative visuals. Visual 1 (Middle): Visual 2 (Right):",
        layout_9_16: "An information-rich triple panel layout. The screen is divided into three horizontal sections. The top panel shows the expert, CHAR_1, against BACKGROUND_1. The middle and bottom panels display two related illustrative visuals. Visual 1 (Middle): Visual 2 (Bottom):"
    },
    {
        id: 'l_shape',
        name: 'L-Shape Border',
        layout_16_9: "L-shaped composition. A border along the top and left edges contains the expert, CHAR_1, speaking against BACKGROUND_1. The main, larger area of the screen is dedicated to the illustrative visual. The visual is:",
        layout_9_16: "L-shaped composition. A border along the top and left edges contains the expert, CHAR_1, speaking against BACKGROUND_1. The main, larger area of the screen is dedicated to the illustrative visual. The visual is:"
    },
    {
        id: 'spotlight_circle',
        name: 'Spotlight Circle',
        layout_16_9: "A radial spotlight composition. The expert, CHAR_1, is featured in a circular frame in the center of the screen, as if in a spotlight, speaking against BACKGROUND_1. The surrounding area is filled with the illustrative visual. The visual is:",
        layout_9_16: "A radial spotlight composition. The expert, CHAR_1, is featured in a circular frame in the center of the screen, as if in a spotlight, speaking against BACKGROUND_1. The surrounding area is filled with the illustrative visual. The visual is:"
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

export const SCENARIO_TEMPLATES = [
    {
        id: 'doctor',
        nameKey: 'template_doctor',
        character: `Dr. Strong - Physician

🆔 CORE IDENTITY:
Species: Human | Gender: Male | Age: 70 years old | Ethnicity: Caucasian American

👤 FACE:
Face Shape: Warm and wise with a kind smile | Skin Color: Fair | Signature Features: Noticeable smile lines | Facial Hair: Clean-shaven

💇 HAIR:
Hair Color: Silver-white | Hair Style: Distinguished, neatly styled | Hair Texture: Wavy | Hair Length: Short

👓 EYES & GLASSES:
Eye Color: Blue | Eye Shape: Almond | Glasses: ALWAYS worn, classic wire-rimmed reading glasses

🏋️ BODY:
Body Build: Average, healthy | Height: 6'0" | Posture: Upright and confident

👔 CLOTHING (IDENTICAL IN ALL SCENES):
Top: Pristine white lab coat over royal blue medical scrubs | Bottom: Royal blue scrub pants | Shoes: Professional, comfortable medical clogs | Accessories: Stethoscope draped around the neck, ID badge on lab coat reading "Dr. Strong, PT"

⚠️ CRITICAL: All details MUST BE IDENTICAL in ALL scenes.`,
        background: 'A professional, clean, and modern medical office. The background includes a bookshelf with medical texts, a diploma on the wall, and soft, natural lighting from a window. The overall feel is warm, authoritative, and welcoming.',
        voice: 'Deliver with a clear, professional, and empathetic tone. Maintain a moderate volume and a steady pace. Emphasize key medical terms and reassuring phrases.',
        script: 'Ninety-four percent of people over sixty exercise incorrectly, accelerating joint damage. I\'m Dr. Strong, and for thirty years, I\'ve helped thousands regain independence. Most advice you followed for years was wrong. The latest science reveals the truth. We will count down five movements, from helpful to life-changing. Number one has restored abilities thousands thought were lost forever.'
    },
    {
        id: 'teacher',
        nameKey: 'template_teacher',
        character: `Mr. James Walker - Teacher

🆔 CORE IDENTITY:
Species: Human | Gender: Male | Age: 38 years old | Ethnicity: Caucasian

👤 FACE:
Face Shape: Oval, friendly | Skin Color: Fair | Signature Features: An engaging and welcoming smile | Facial Hair: None

💇 HAIR:
Hair Color: Brown | Hair Style: Neatly styled, classic short cut | Hair Texture: Straight | Hair Length: Short

👓 EYES & GLASSES:
Eye Color: Hazel | Eye Shape: Round | Glasses: Does NOT wear glasses

🏋️ BODY:
Body Build: Slim to average | Height: 5'11" | Posture: Approachable and passionate, often leans forward slightly when explaining things

👔 CLOTHING (IDENTICAL IN ALL SCENES):
Top: Light blue button-down shirt with sleeves rolled up to the elbow | Bottom: Dark gray trousers | Shoes: Brown leather smart casual shoes | Accessories: A simple, classic wristwatch

⚠️ CRITICAL: All details MUST BE IDENTICAL in ALL scenes.`,
        background: 'A bright and organized classroom. In the background, there is a large whiteboard with some educational diagrams, a colorful bookshelf filled with books, and a window letting in natural light. A small plant sits on the corner of his desk.',
        voice: 'Deliver with an enthusiastic, clear, and patient tone. Speak at a slightly slower pace to ensure comprehension. Sound encouraging and positive throughout the delivery.',
        script: 'Hello class, and welcome! Today, we\'re going to explore the fascinating world of photosynthesis. It might sound complex, but I promise, by the end of this lesson, you\'ll see how plants use sunlight to create their own food. Let\'s start with the basics. What are the three key ingredients a plant needs?'
    },
    {
        id: 'expert',
        nameKey: 'template_expert',
        character: `Anya Sharma - Tech Analyst

🆔 CORE IDENTITY:
Species: Human | Gender: Female | Age: 42 years old | Ethnicity: South Asian

👤 FACE:
Face Shape: Heart-shaped, sharp and confident | Skin Color: Light brown | Signature Features: An intelligent, focused expression | Facial Hair: None

💇 HAIR:
Hair Color: Dark, almost black | Hair Style: Sleek, tied back in a professional ponytail | Hair Texture: Straight | Hair Length: Long

👓 EYES & GLASSES:
Eye Color: Dark Brown | Eye Shape: Almond | Glasses: ALWAYS worn, modern, minimalist black-framed glasses

🏋️ BODY:
Body Build: Slender, poised | Height: 5'7" | Posture: Authoritative and upright

👔 CLOTHING (IDENTICAL IN ALL SCENES):
Top: A stylish, well-fitted dark navy blue blazer over a simple white silk blouse | Bottom: Matching navy blue trousers | Shoes: Black professional heels | Accessories: Minimalist silver earrings and a delicate necklace

⚠️ CRITICAL: All details MUST BE IDENTICAL in ALL scenes.`,
        background: 'A minimalist, high-tech studio with a clean aesthetic. The background is slightly out of focus, featuring a large screen displaying abstract data visualizations and subtle, dynamic LED lighting along the wall panels. The overall look is modern, sleek, and professional.',
        voice: 'Deliver with a confident, articulate, and crisp tone. The pace should be deliberate and well-measured, conveying expertise. Emphasize key data points and technical terms with precision and clarity.',
        script: 'The latest market data reveals a significant shift in consumer behavior towards decentralized platforms. In Q3, we saw a 40% increase in user adoption for Web3 applications, a trend that is disrupting traditional business models. This isn\'t just a fad; it\'s a fundamental change in how we interact with the digital world. The key takeaway for investors is this: adapt or be left behind.'
    }
];

export const CHARACTER_CONSISTENCY_PROMPT_BLOCK = (characterName: string) => `
🔒 **CRITICAL CHARACTER CONSISTENCY DIRECTIVE** 🔒
The character "${characterName}" is under a strict consistency lock.
- **REFERENCE**: The authoritative definition for this character's appearance is provided in the 'character_lock' JSON object for this scene.
- **RULE**: You MUST render this character with 100% fidelity to the 'character_lock' data. Every physical attribute—face, hair, body, clothing—is immutable and must be identical to how this character has appeared in all previous scenes.
- **PERMITTED CHANGES**: Only the 'pose', 'expression', and 'action_flow' for the current scene may differ.
- **FAILURE CONDITION**: Any deviation in the character's core appearance from the 'character_lock' specification is a critical generation error.
---
`;
