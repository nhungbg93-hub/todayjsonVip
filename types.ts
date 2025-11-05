import { SUPPORTED_LANGUAGES, VEO_SPEAKERS, VISUAL_STYLES, PROMPT_STYLES, FRAME_LAYOUTS } from "./constants";

export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];
export type VeoSpeakerId = typeof VEO_SPEAKERS[number]['id'];
export type VisualStyleId = typeof VISUAL_STYLES[number];
export type PromptStyleId = typeof PROMPT_STYLES[number]['id'];
export type FrameLayoutId = typeof FRAME_LAYOUTS[number]['id'];

export interface Character {
  id: "CHAR_1";
  name: string;
  species: string;
  gender: string;
  age: string;
  voice_personality: string;
  body_build: string;
  face_shape: string;
  hair: string;
  skin_or_fur_color: string;
  signature_feature: string;
  outfit_top: string;
  outfit_bottom: string;
  helmet_or_hat: string;
  shoes_or_footwear: string;
  props: string;
  body_metrics: string;
}

export interface Background {
  id: "BACKGROUND_1";
  name: string;
  setting: string;
  scenery: string;
  props: string;
  lighting: string;
}

export interface Setup {
  character_lock: {
    CHAR_1: Character;
  };
  background_lock: {
    BACKGROUND_1: Background;
  };
  visual_style: VisualStyleId;
  negative_prompt: string;
}

export interface Pose {
  position: string;
  orientation: string;
  pose: string;
  foot_placement: string;
  hand_detail: string;
  expression: string;
}

export interface ActionFlow {
  pre_action: string;
  main_action: string;
  post_action: string;
}

export interface Dialogue {
  speaker: VeoSpeakerId;
  language: LanguageCode;
  line: string;
  delivery: string;
}

export interface Scene {
  scene_id: string;
  duration_sec: number;
  visual_style: VisualStyleId;
  negative_prompt: string;
  character_lock: {
    [key: string]: Character & Pose & { action_flow: ActionFlow };
  };
  background_lock: {
    [key: string]: Background;
  };
  prompt: string;
  foley_and_ambience: {
    ambience: string[];
    fx: string[];
    music: string;
  };
  dialogue: Dialogue[];
  lip_sync_director_note: string;
}

export interface Stats {
  sceneCount: number;
  totalDuration: number;
  totalWords: number;
}

export interface ScenePlan {
    scene_text: string;
    illustration_prompt: string;
}