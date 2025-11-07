import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { translations, Language, TranslationKey } from '../i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'veo-app-language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
        const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
        // Check if the saved language is a valid one before using it
        if (savedLang && translations[savedLang]) {
            return savedLang;
        }
    } catch (error) {
        console.error("Failed to read language from localStorage", error);
    }
    return 'vi'; // Default to Vietnamese
  });

  useEffect(() => {
    try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
        console.error("Failed to save language to localStorage", error);
    }
  }, [language]);

  const t = (key: TranslationKey, fallback?: string): string => {
    return translations[language][key] || translations['en'][key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
