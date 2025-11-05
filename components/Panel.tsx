import React from 'react';
import CopyButton from './CopyButton';

interface PanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  copyContent?: string;
}

const Panel: React.FC<PanelProps> = ({ title, children, className = '', copyContent }) => {
  return (
    <div className={`bg-gray-800 rounded-xl shadow-lg flex flex-col ${className}`}>
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-cyan-400">{title}</h2>
        {copyContent && (
          <CopyButton textToCopy={copyContent} />
        )}
      </div>
      <div className="p-4 flex-grow overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Panel;
