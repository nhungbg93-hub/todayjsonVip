
export const translations = {
  en: {
    // Header
    headerTitle: "VEO 3 Script to JSON Converter",
    headerSubtitle: "AI-Powered Script Processor for Automated Video Generation",
    
    // Panels
    panelConfig: "Configuration",
    panelContentInput: "Content Input",
    panelScript: "Source Script",
    panelStats: "Statistics",
    panelSetupJson: "Setup JSON",
    panelScenesJsonl: "Scenes JSONL",

    // Config Panel
    configApiKeys: "Gemini API Keys (space-separated)",
    configApiKeysPlaceholder: "Enter one or more API keys",
    configSourceLanguage: "Source Language",
    configLanguage: "Output Language",
    configSpeaker: "Speaker Voice",
    configVisualStyle: "Visual Style",
    configPromptStyle: "Prompt Style",
    configFrameLayout: "Frame Layout",
    configAspectRatio: "Aspect Ratio",
    aspectRatioLandscape: "16:9 (Landscape)",
    aspectRatioPortrait: "9:16 (Portrait)",
    configInputTemplate: "Input Template",

    // Template Names
    template_doctor: "Doctor",
    template_teacher: "Teacher",
    template_expert: "Expert",

    // Content Input Panel
    contentCharacter: "Character Description (Used for non-visuals if image is uploaded)",
    contentCharacterPlaceholder: "Describe your character...",
    contentBackground: "Background Description",
    contentBackgroundPlaceholder: "Describe the background scene...",
    contentVoice: "Voice-over Delivery Instructions",
    contentVoicePlaceholder: "Describe the vocal tone, pace, and emphasis...",
    contentCharacterImage: "Character Reference Image (Primary Source)",
    uploadFile: "Upload a file",
    dragAndDrop: "or drag and drop",
    imageFileType: "PNG, JPG, WEBP",
    removeImage: "Remove Image",

    // Script Panel
    scriptLabel: "Enter your script below",
    scriptPlaceholder: "Paste your source script here...",

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
    'vibrant_colorful': 'Vibrant & Colorful',
    'mystery_intrigue': 'Mystery & Intrigue',
    'illustration_2d': '2D Illustration',
    'illustration_3d': '3D Illustration',
    'illustration_diverse': 'Diverse Illustration Styles',
    'storytelling': 'Storytelling & Narrative',
    'contrast_comparison': 'Contrast & Comparison',
    'symbolic_metaphor': 'Symbolic & Metaphorical',
    'surprise_unexpected': 'Surprise & Unexpected',
    'social_relatable': 'Social & Relatable',
    'humor_playful': 'Humorous & Playful',
    'epic_grand': 'Epic & Grand Scale',
    'futuristic_tech': 'Futuristic & Tech-Forward',
    'natural_organic': 'Natural & Organic',
    'retro_vintage': 'Retro & Vintage',
    'action_packed': 'Action-Packed & Intense',
    'educational_clear': 'Educational & Crystal Clear',
    'warm_friendly': 'Warm & Friendly',
    'luxury_premium': 'Luxury & Premium',

    // Frame Layouts
    'standard': 'Standard Layout (1/3 Doctor)',
    'illustration_focus': 'Illustration Focus (Vertical Inset)',
    'split_50_50': 'Split Screen (50/50)',
    'full_overlay': 'Full Frame Doctor (with Overlay)',
    'background_integration': 'Background Integration (News Style)',
    'illustration_takeover': 'Illustration Takeover (Voice-over)',
    'pip_dynamic': 'Picture-in-Picture (Dynamic)',
    'visual_emphasis': 'Visual Emphasis (Quick Punch-in)',
    'black_background_split': 'Black Background Split',
    'pip_corner': 'Picture-in-Picture (Corner)',
    'floating_frame': 'Floating Frame (3D Depth)',
    'cinematic_letterbox': 'Cinematic Letterbox',
    'minimal_corner': 'Minimalist Corner',
    'diagonal_split': 'Diagonal Split',
    'triple_panel': 'Triple Panel',
    'l_shape': 'L-Shape Border',
    'spotlight_circle': 'Spotlight Circle',
    'minhhoa_tren': 'Illustration Above (60/40 Split)',
    'minhhoa_sau': 'Illustration Behind (Centered Expert)',
    'minhhoa_3_4': 'Illustration 3/4 (Vertical Bar)',
    'parallel_mix': 'Parallel Mix (70/30 Split)',
  },
  vi: {
    // Header
    headerTitle: "Chuyển đổi Kịch bản VEO 3 sang JSON",
    headerSubtitle: "Trình xử lý kịch bản bằng AI cho việc tạo video tự động",

    // Panels
    panelConfig: "Cấu hình",
    panelContentInput: "Nội dung đầu vào",
    panelScript: "Kịch bản Nguồn",
    panelStats: "Thống kê",
    panelSetupJson: "Setup JSON",
    panelScenesJsonl: "Scenes JSONL",

    // Config Panel
    configApiKeys: "Gemini API Keys (cách nhau bằng dấu cách)",
    configApiKeysPlaceholder: "Nhập một hoặc nhiều API key",
    configSourceLanguage: "Ngôn ngữ Nguồn",
    configLanguage: "Ngôn ngữ Đầu ra",
    configSpeaker: "Giọng nói",
    configVisualStyle: "Phong cách hình ảnh",
    configPromptStyle: "Phong cách Prompt",
    configFrameLayout: "Bố cục Khung hình",
    configAspectRatio: "Tỷ lệ khung hình",
    aspectRatioLandscape: "16:9 (Ngang)",
    aspectRatioPortrait: "9:16 (Dọc)",
    configInputTemplate: "Mẫu Đầu Vào",

    // Template Names
    template_doctor: "Bác sĩ",
    template_teacher: "Thầy giáo",
    template_expert: "Chuyên gia",

    // Content Input Panel
    contentCharacter: "Mô tả nhân vật (Dùng cho thông tin phi trực quan nếu có ảnh)",
    contentCharacterPlaceholder: "Mô tả nhân vật của bạn...",
    contentBackground: "Mô tả bối cảnh",
    contentBackgroundPlaceholder: "Mô tả bối cảnh, khung cảnh...",
    contentVoice: "Hướng dẫn giọng đọc",
    contentVoicePlaceholder: "Mô tả tông giọng, nhịp độ, và điểm nhấn...",
    contentCharacterImage: "Ảnh tham chiếu nhân vật (Nguồn chính)",
    uploadFile: "Tải tệp lên",
    dragAndDrop: "hoặc kéo và thả",
    imageFileType: "PNG, JPG, WEBP",
    removeImage: "Xóa ảnh",

    // Script Panel
    scriptLabel: "Nhập kịch bản của bạn dưới đây",
    scriptPlaceholder: "Dán kịch bản nguồn của bạn vào đây...",

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
    'vibrant_colorful': 'Sống động & Đầy màu sắc',
    'mystery_intrigue': 'Bí ẩn & Hấp dẫn',
    'illustration_2d': 'Minh hoạ 2D',
    'illustration_3d': 'Minh hoạ 3D',
    'illustration_diverse': 'Minh hoạ đa dạng',
    'storytelling': 'Kể chuyện & Tường thuật',
    'contrast_comparison': 'Tương phản & So sánh',
    'symbolic_metaphor': 'Biểu tượng & Ẩn dụ',
    'surprise_unexpected': 'Bất ngờ & Khó đoán',
    'social_relatable': 'Gần gũi & Đời thường',
    'humor_playful': 'Hài hước & Vui nhộn',
    'epic_grand': 'Sử thi & Vĩ mô',
    'futuristic_tech': 'Tương lai & Công nghệ',
    'natural_organic': 'Tự nhiên & Mộc mạc',
    'retro_vintage': 'Hoài cổ & Cổ điển',
    'action_packed': 'Hành động & Kịch tính',
    'educational_clear': 'Giáo dục & Rõ ràng',
    'warm_friendly': 'Ấm áp & Thân thiện',
    'luxury_premium': 'Sang trọng & Cao cấp',
    
    // Frame Layouts
    'standard': 'Bố cục Tiêu chuẩn (1/3 Bác sĩ)',
    'illustration_focus': 'Tập trung Minh họa (Khung dọc)',
    'split_50_50': 'Chia đôi màn hình (50/50)',
    'full_overlay': 'Bác sĩ toàn khung (Minh họa phủ lên)',
    'background_integration': 'Tích hợp vào nền (Kiểu tin tức)',
    'illustration_takeover': 'Minh họa toàn màn hình (Thuyết minh)',
    'pip_dynamic': 'Hình trong hình (Động)',
    'visual_emphasis': 'Nhấn mạnh hình ảnh (Chèn nhanh)',
    'black_background_split': 'Phông Đen Chia Đôi',
    'pip_corner': 'Hình trong hình (Góc)',
    'floating_frame': 'Khung Nổi (Hiệu ứng 3D)',
    'cinematic_letterbox': 'Hộp thư Điện ảnh',
    'minimal_corner': 'Góc Tối giản',
    'diagonal_split': 'Chia chéo Màn hình',
    'triple_panel': 'Bảng Ba Khung',
    'l_shape': 'Viền Chữ L',
    'spotlight_circle': 'Vòng tròn Tâm điểm',
    'minhhoa_tren': 'Minh họa Phía trên (60/40)',
    'minhhoa_sau': 'Minh họa Phía sau (Chuyên gia ở giữa)',
    'minhhoa_3_4': 'Minh họa 3/4 (Thanh dọc)',
    'parallel_mix': 'Nội dung Song hành (70/30)',
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;