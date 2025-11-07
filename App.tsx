import React, { useState, useCallback, useEffect } from 'react';
import { Stats, LanguageCode, VeoSpeakerId, VisualStyleId, PromptStyleId, FrameLayoutId } from './types';
import { SCENARIO_TEMPLATES, SUPPORTED_LANGUAGES, VEO_SPEAKERS, VISUAL_STYLES, PROMPT_STYLES, FRAME_LAYOUTS } from './constants';
import { convertScript } from './services/converter';
import Panel from './components/Panel';
import TextAreaInput from './components/TextAreaInput';
import StatCard from './components/StatCard';
import Notification from './components/Notification';
import { useLanguage } from './contexts/LanguageContext';

const APP_STATE_KEY = 'veo-app-state';

const getInitialState = () => {
    try {
        const savedState = localStorage.getItem(APP_STATE_KEY);
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            // Ensure all keys exist to prevent errors if the stored object is outdated
            const defaultTemplate = SCENARIO_TEMPLATES[0];
            return {
                apiKeys: parsedState.apiKeys ?? (process.env.API_KEY || ''),
                selectedTemplate: parsedState.selectedTemplate ?? defaultTemplate.id,
                characterDescription: parsedState.characterDescription ?? defaultTemplate.character,
                backgroundDescription: parsedState.backgroundDescription ?? defaultTemplate.background,
                inputText: parsedState.inputText ?? defaultTemplate.script,
                voiceInstructions: parsedState.voiceInstructions ?? defaultTemplate.voice,
                aspectRatio: parsedState.aspectRatio ?? '16:9',
                sourceLanguage: parsedState.sourceLanguage ?? 'en-US',
                language: parsedState.language ?? 'en-US',
                speaker: parsedState.speaker ?? 'onyx',
                visualStyle: parsedState.visualStyle ?? 'Realistic',
                promptStyle: parsedState.promptStyle ?? 'cinematic',
                frameLayout: parsedState.frameLayout ?? 'standard',
            };
        }
    } catch (error) {
        console.error("Failed to parse saved state from localStorage", error);
    }
    // Return default state if nothing is saved or parsing fails
    const defaultTemplate = SCENARIO_TEMPLATES[0];
    return {
        apiKeys: process.env.API_KEY || '',
        selectedTemplate: defaultTemplate.id,
        characterDescription: defaultTemplate.character,
        backgroundDescription: defaultTemplate.background,
        inputText: defaultTemplate.script,
        voiceInstructions: defaultTemplate.voice,
        aspectRatio: '16:9' as '16:9' | '9:16',
        sourceLanguage: 'en-US' as LanguageCode,
        language: 'en-US' as LanguageCode,
        speaker: 'onyx' as VeoSpeakerId,
        visualStyle: 'Realistic' as VisualStyleId,
        promptStyle: 'cinematic' as PromptStyleId,
        frameLayout: 'standard' as FrameLayoutId,
    };
};


const App: React.FC = () => {
    const { language: uiLanguage, setLanguage: setUiLanguage, t } = useLanguage();
    
    const [initialState] = useState(getInitialState);

    const [apiKeys, setApiKeys] = useState(initialState.apiKeys);
    const [selectedTemplate, setSelectedTemplate] = useState(initialState.selectedTemplate);
    const [characterDescription, setCharacterDescription] = useState(initialState.characterDescription);
    const [backgroundDescription, setBackgroundDescription] = useState(initialState.backgroundDescription);
    const [inputText, setInputText] = useState(initialState.inputText);
    const [voiceInstructions, setVoiceInstructions] = useState(initialState.voiceInstructions);
    const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>(initialState.aspectRatio);
    const [sourceLanguage, setSourceLanguage] = useState<LanguageCode>(initialState.sourceLanguage);
    const [language, setLanguage] = useState<LanguageCode>(initialState.language);
    const [speaker, setSpeaker] = useState<VeoSpeakerId>(initialState.speaker);
    const [visualStyle, setVisualStyle] = useState<VisualStyleId>(initialState.visualStyle);
    const [promptStyle, setPromptStyle] = useState<PromptStyleId>(initialState.promptStyle);
    const [frameLayout, setFrameLayout] = useState<FrameLayoutId>(initialState.frameLayout);
    
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    
    const [setupJson, setSetupJson] = useState('');
    const [scenesJsonl, setScenesJsonl] = useState('');
    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
        const stateToSave = {
            apiKeys,
            selectedTemplate,
            characterDescription,
            backgroundDescription,
            inputText,
            voiceInstructions,
            aspectRatio,
            sourceLanguage,
            language,
            speaker,
            visualStyle,
            promptStyle,
            frameLayout,
        };
        localStorage.setItem(APP_STATE_KEY, JSON.stringify(stateToSave));
    }, [
        apiKeys, selectedTemplate, characterDescription, backgroundDescription,
        inputText, voiceInstructions, aspectRatio, sourceLanguage, language,
        speaker, visualStyle, promptStyle, frameLayout
    ]);

    const handleTemplateChange = (templateId: string) => {
        const template = SCENARIO_TEMPLATES.find(t => t.id === templateId);
        if (template) {
            setSelectedTemplate(template.id);
            setCharacterDescription(template.character);
            setBackgroundDescription(template.background);
            setVoiceInstructions(template.voice);
            setInputText(template.script);
        }
    };

    const handleGenerate = useCallback(async () => {
        setIsLoading(true);
        setNotification(null);
        setSetupJson('');
        setScenesJsonl('');
        setStats(null);

        try {
            const result = await convertScript(
                apiKeys,
                characterDescription,
                backgroundDescription,
                inputText,
                voiceInstructions,
                aspectRatio,
                sourceLanguage,
                language,
                speaker,
                visualStyle,
                promptStyle,
                frameLayout
            );
            setSetupJson(result.setupJson);
            setScenesJsonl(result.scenesJsonl);
            setStats(result.stats);
            setNotification({ message: t('notifySuccess'), type: 'success' });
        } catch (error: any) {
            console.error("Generation failed:", error);
            setNotification({ message: error.message || t('notifyErrorUnknown'), type: 'error' });
        } finally {
            setIsLoading(false);
        }
    }, [apiKeys, characterDescription, backgroundDescription, inputText, voiceInstructions, aspectRatio, sourceLanguage, language, speaker, visualStyle, promptStyle, frameLayout, t]);

    const FilmIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
    const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    const TextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-900">
            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
            
            <header className="text-center mb-8 relative">
                <div className="absolute top-0 right-0 flex items-center space-x-2 bg-gray-800 p-1 rounded-full">
                   <button onClick={() => setUiLanguage('en')} className={`px-3 py-1 text-sm rounded-full transition ${uiLanguage === 'en' ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>EN</button>
                   <button onClick={() => setUiLanguage('vi')} className={`px-3 py-1 text-sm rounded-full transition ${uiLanguage === 'vi' ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>VI</button>
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                    {t('headerTitle')}
                </h1>
                <p className="mt-2 text-lg text-gray-400">{t('headerSubtitle')}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <Panel title={t('panelConfig')}>
                      <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-400 mb-2">{t('configInputTemplate')}</label>
                          <select
                              value={selectedTemplate}
                              onChange={(e) => handleTemplateChange(e.target.value)}
                              className="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm p-3 focus:border-cyan-500 focus:ring-cyan-500"
                          >
                              {SCENARIO_TEMPLATES.map((template) => (
                                  <option key={template.id} value={template.id}>
                                      {t(template.nameKey as any)}
                                  </option>
                              ))}
                          </select>
                      </div>
                      <TextAreaInput
                          label={t('configApiKeys')}
                          value={apiKeys}
                          onChange={(e) => setApiKeys(e.target.value)}
                          placeholder={t('configApiKeysPlaceholder')}
                          rows={2}
                      />
                       <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-400 mb-2">{t('configSourceLanguage')}</label>
                          <select
                              value={sourceLanguage}
                              onChange={(e) => setSourceLanguage(e.target.value as LanguageCode)}
                              className="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm p-3 focus:border-cyan-500 focus:ring-cyan-500"
                          >
                              {SUPPORTED_LANGUAGES.map((lang) => (
                                  <option key={lang.code} value={lang.code}>
                                      {t(lang.code as any, lang.name)}
                                  </option>
                              ))}
                          </select>
                      </div>
                       <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-400 mb-2">{t('configLanguage')}</label>
                          <select
                              value={language}
                              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                              className="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm p-3 focus:border-cyan-500 focus:ring-cyan-500"
                          >
                              {SUPPORTED_LANGUAGES.map((lang) => (
                                  <option key={lang.code} value={lang.code}>
                                      {t(lang.code as any, lang.name)}
                                  </option>
                              ))}
                          </select>
                      </div>
                      <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-400 mb-2">{t('configSpeaker')}</label>
                          <select
                              value={speaker}
                              onChange={(e) => setSpeaker(e.target.value as VeoSpeakerId)}
                              className="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm p-3 focus:border-cyan-500 focus:ring-cyan-500"
                          >
                              {VEO_SPEAKERS.map((spk) => (
                                  <option key={spk.id} value={spk.id}>
                                      {spk.name}
                                  </option>
                              ))}
                          </select>
                      </div>
                      <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-400 mb-2">{t('configVisualStyle')}</label>
                          <select
                              value={visualStyle}
                              onChange={(e) => setVisualStyle(e.target.value as VisualStyleId)}
                              className="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm p-3 focus:border-cyan-500 focus:ring-cyan-500"
                          >
                              {VISUAL_STYLES.map((style) => (
                                  <option key={style} value={style}>
                                      {style.replace(/_/g, ' ')}
                                  </option>
                              ))}
                          </select>
                      </div>
                       <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-400 mb-2">{t('configPromptStyle')}</label>
                          <select
                              value={promptStyle}
                              onChange={(e) => setPromptStyle(e.target.value as PromptStyleId)}
                              className="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm p-3 focus:border-cyan-500 focus:ring-cyan-500"
                          >
                              {PROMPT_STYLES.map((style) => (
                                  <option key={style.id} value={style.id}>
                                      {t(style.id as any, style.name)}
                                  </option>
                              ))}
                          </select>
                      </div>
                       <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-400 mb-2">{t('configFrameLayout')}</label>
                          <select
                              value={frameLayout}
                              onChange={(e) => setFrameLayout(e.target.value as FrameLayoutId)}
                              className="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm p-3 focus:border-cyan-500 focus:ring-cyan-500"
                          >
                              {FRAME_LAYOUTS.map((layout) => (
                                  <option key={layout.id} value={layout.id}>
                                      {t(layout.id as any, layout.name)}
                                  </option>
                              ))}
                          </select>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-400 mb-2">{t('configAspectRatio')}</label>
                        <div className="flex space-x-4">
                            <button onClick={() => setAspectRatio('16:9')} className={`px-4 py-2 rounded-md transition ${aspectRatio === '16:9' ? 'bg-cyan-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>{t('aspectRatioLandscape')}</button>
                            <button onClick={() => setAspectRatio('9:16')} className={`px-4 py-2 rounded-md transition ${aspectRatio === '9:16' ? 'bg-cyan-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>{t('aspectRatioPortrait')}</button>
                        </div>
                      </div>
                    </Panel>
                    <Panel title={t('panelContentInput')}>
                      <TextAreaInput
                          label={t('contentCharacter')}
                          value={characterDescription}
                          onChange={(e) => setCharacterDescription(e.target.value)}
                          placeholder={t('contentCharacterPlaceholder')}
                          rows={6}
                      />
                      <TextAreaInput
                          label={t('contentBackground')}
                          value={backgroundDescription}
                          onChange={(e) => setBackgroundDescription(e.target.value)}
                          placeholder={t('contentBackgroundPlaceholder')}
                          rows={4}
                      />
                       <TextAreaInput
                          label={t('contentVoice')}
                          value={voiceInstructions}
                          onChange={(e) => setVoiceInstructions(e.target.value)}
                          placeholder={t('contentVoicePlaceholder')}
                          rows={4}
                      />
                    </Panel>
                </div>

                {/* Middle Column: Script & Action */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                   <Panel title={t('panelScript')} className="flex-grow">
                        <TextAreaInput
                            label={t('scriptLabel')}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder={t('scriptPlaceholder')}
                            rows={20}
                        />
                    </Panel>
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                    >
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {t('buttonGenerating')}
                          </div>
                        ) : t('buttonGenerate')}
                    </button>
                    {stats && (
                        <Panel title={t('panelStats')}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                               <StatCard label={t('statsScenes')} value={stats.sceneCount} icon={<FilmIcon />} />
                               <StatCard label={t('statsDuration')} value={`${stats.totalDuration}s`} icon={<ClockIcon />} />
                               <StatCard label={t('statsWords')} value={stats.totalWords} icon={<TextIcon />} />
                            </div>
                        </Panel>
                    )}
                </div>

                {/* Right Column: Outputs */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <Panel title={t('panelSetupJson')} className="flex-grow" copyContent={setupJson}>
                       <TextAreaInput
                          label={t('outputSetupJsonLabel')}
                          value={setupJson}
                          onChange={() => {}}
                          placeholder={t('outputSetupJsonPlaceholder')}
                          rows={10}
                          isReadOnly
                       />
                    </Panel>
                    <Panel title={t('panelScenesJsonl')} className="flex-grow" copyContent={scenesJsonl}>
                        <TextAreaInput
                            label={t('outputScenesJsonlLabel')}
                            value={scenesJsonl}
                            onChange={() => {}}
                            placeholder={t('outputScenesJsonlPlaceholder')}
                            rows={15}
                            isReadOnly
                        />
                    </Panel>
                </div>
            </div>
        </div>
    );
};

export default App;