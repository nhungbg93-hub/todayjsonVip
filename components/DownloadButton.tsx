import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface DownloadButtonProps {
  content: string;
  filename: string;
  disabled?: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ content, filename, disabled = false }) => {
  const { t } = useLanguage();

  const handleDownload = () => {
    if (!content || disabled) return;

    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );

  return (
    <button
      onClick={handleDownload}
      className="p-2 rounded-md transition-colors duration-200 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label={t('downloadTooltip')}
      title={t('downloadTooltip')}
      disabled={disabled || !content}
    >
      <DownloadIcon />
    </button>
  );
};

export default DownloadButton;
