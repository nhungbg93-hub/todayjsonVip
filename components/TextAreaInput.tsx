
import React from 'react';

interface TextAreaInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  rows?: number;
  isReadOnly?: boolean;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ label, value, onChange, placeholder, rows = 4, isReadOnly = false }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        readOnly={isReadOnly}
        className={`w-full bg-gray-900 border ${isReadOnly ? 'border-gray-700' : 'border-gray-600 focus:border-cyan-500 focus:ring-cyan-500'} text-gray-200 rounded-md shadow-sm p-3 transition duration-200 ease-in-out`}
      />
    </div>
  );
};

export default TextAreaInput;
