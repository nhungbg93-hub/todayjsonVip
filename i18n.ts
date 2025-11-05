export const translations = {
  en: {
    // Header
    headerTitle: "VEO 3 Script to JSON Converter",
    headerSubtitle: "AI-Powered Script Processor for Automated Video Generation",
    
    // Panels
    panelConfig: "Configuration",
    panelContentInput: "Content Input",
    panelScript: "Vietnamese Script",
    panelStats: "Statistics",
    panelSetupJson: "Setup JSON",
    panelScenesJsonl: "Scenes JSONL",

    // Config Panel
    configApiKeys: "Gemini API Keys (space-separated)",
    configApiKeysPlaceholder: "Enter one or more API keys",
    configLanguage: "Output Language",
    configSpeaker: "Speaker Voice",
    configVisualStyle: "Visual Style",
    configPromptStyle: "Prompt Style",
    configFrameLayout: "Frame Layout",
    configAspectRatio: "Aspect Ratio",
    aspectRatioLandscape: "16:9 (Landscape)",
    aspectRatioPortrait: "9:16 (Portrait)",

    // Content Input Panel
    contentCharacter: "Character Description",
    contentCharacterPlaceholder: "Describe your character...",
    contentBackground: "Background Description",
    contentBackgroundPlaceholder: "Describe the background scene...",
    contentVoice: "Voice-over Delivery Instructions",
    contentVoicePlaceholder: "Describe the vocal tone, pace, and emphasis...",

    // Script Panel
    scriptLabel: "Enter your script below",
    scriptPlaceholder: "Paste your Vietnamese script here...",

    // Button
    buttonGenerate: "Generate JSON",
    buttonGenerating: "Generating...",

    // Stats
    statsScenes: "Total Scenes",
    statsDuration: "Total Duration",
    statsWords: "Total Words",
    
    // Outputs
    outputSetupJsonLabel: "setup.json",
    outputSetupJsonPlaceholder: "Setup JSON will appear here...",
    outputScenesJsonlLabel: "scenes.jsonl",
    outputScenesJsonlPlaceholder: "Scenes JSONL will appear here...",

    // Notifications
    notifySuccess: "Generation successful!",
    notifyErrorUnknown: "An unknown error occurred.",
    
    // Copy Button
    copyTooltip: "Copy to clipboard",
    copiedTooltip: "Copied!",

    // Language Names (for dropdown)
    'en-US': 'English (US)',
    'vi-VN': 'Vietnamese',
    'fr-FR': 'French',
    'ja-JP': 'Japanese',
    'zh-CN': 'Chinese (Simplified)',
    'hi-IN': 'Hindi',
    'th-TH': 'Thai',
    'ko-KR': 'Korean',
    'it-IT': 'Italian',
    'de-DE': 'German',
    'es-ES': 'Spanish',
    'ru-RU': 'Russian',

    // Prompt Styles
    'cinematic': 'Cinematic & Metaphorical',
    'dynamic': 'Dynamic & Energetic',
    'emotional': 'Emotional & Introspective',
    'documentary': 'Documentary & Factual',
    'minimalist': 'Minimalist & Clean',
    'illustration_2d': '2D Illustration',
    'illustration_3d': '3D Illustration',
    'illustration_diverse': 'Diverse Illustration Styles',

    // Frame Layouts
    'standard': 'Standard Layout (1/3 Doctor)',
    'split_50_50': 'Split Screen (50/50)',
    'full_overlay': 'Full Frame Doctor (with Overlay)',
  },
  vi: {
    // Header
    headerTitle: "Chuyển đổi Kịch bản VEO 3 sang JSON",
    headerSubtitle: "Trình xử lý kịch bản bằng AI cho việc tạo video tự động",

    // Panels
    panelConfig: "Cấu hình",
    panelContentInput: "Nội dung đầu vào",
    panelScript: "Kịch bản tiếng Việt",
    panelStats: "Thống kê",
    panelSetupJson: "Setup JSON",
    panelScenesJsonl: "Scenes JSONL",

    // Config Panel
    configApiKeys: "Gemini API Keys (cách nhau bằng dấu cách)",
    configApiKeysPlaceholder: "Nhập một hoặc nhiều API key",
    configLanguage: "Ngôn ngữ đầu ra",
    configSpeaker: "Giọng nói",
    configVisualStyle: "Phong cách hình ảnh",
    configPromptStyle: "Phong cách Prompt",
    configFrameLayout: "Bố cục Khung hình",
    configAspectRatio: "Tỷ lệ khung hình",
    aspectRatioLandscape: "16:9 (Ngang)",
    aspectRatioPortrait: "9:16 (Dọc)",

    // Content Input Panel
    contentCharacter: "Mô tả nhân vật",
    contentCharacterPlaceholder: "Mô tả nhân vật của bạn...",
    contentBackground: "Mô tả bối cảnh",
    contentBackgroundPlaceholder: "Mô tả bối cảnh, khung cảnh...",
    contentVoice: "Hướng dẫn giọng đọc",
    contentVoicePlaceholder: "Mô tả tông giọng, nhịp độ, và điểm nhấn...",

    // Script Panel
    scriptLabel: "Nhập kịch bản của bạn dưới đây",
    scriptPlaceholder: "Dán kịch bản tiếng Việt của bạn vào đây...",

    // Button
    buttonGenerate: "Tạo JSON",
    buttonGenerating: "Đang tạo...",

    // Stats
    statsScenes: "Tổng số cảnh",
    statsDuration: "Tổng thời lượng",
    statsWords: "Tổng số từ",

    // Outputs
    outputSetupJsonLabel: "setup.json",
    outputSetupJsonPlaceholder: "Setup JSON sẽ xuất hiện ở đây...",
    outputScenesJsonlLabel: "scenes.jsonl",
    outputScenesJsonlPlaceholder: "Scenes JSONL sẽ xuất hiện ở đây...",
    
    // Notifications
    notifySuccess: "Tạo thành công!",
    notifyErrorUnknown: "Đã xảy ra lỗi không xác định.",
    
    // Copy Button
    copyTooltip: "Sao chép vào clipboard",
    copiedTooltip: "Đã sao chép!",

    // Language Names (for dropdown)
    'en-US': 'Tiếng Anh (Mỹ)',
    'vi-VN': 'Tiếng Việt',
    'fr-FR': 'Tiếng Pháp',
    'ja-JP': 'Tiếng Nhật',
    'zh-CN': 'Tiếng Trung (Giản thể)',
    'hi-IN': 'Tiếng Hindi',
    'th-TH': 'Tiếng Thái',
    'ko-KR': 'Tiếng Hàn',
    'it-IT': 'Tiếng Ý',
    'de-DE': 'Tiếng Đức',
    'es-ES': 'Tiếng Tây Ban Nha',
    'ru-RU': 'Tiếng Nga',

    // Prompt Styles
    'cinematic': 'Điện ảnh & Ẩn dụ',
    'dynamic': 'Năng động & Tràn đầy năng lượng',
    'emotional': 'Cảm xúc & Nội tâm',
    'documentary': 'Tài liệu & Thực tế',
    'minimalist': 'Tối giản & Rõ ràng',
    'illustration_2d': 'Minh hoạ 2D',
    'illustration_3d': 'Minh hoạ 3D',
    'illustration_diverse': 'Minh hoạ đa dạng',
    
    // Frame Layouts
    'standard': 'Bố cục Tiêu chuẩn (1/3 Bác sĩ)',
    'split_50_50': 'Chia đôi màn hình (50/50)',
    'full_overlay': 'Bác sĩ toàn khung (Minh họa phủ lên)',
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;