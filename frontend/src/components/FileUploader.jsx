import React, { useState } from 'react';
import { Upload, X, FileText, Check } from 'lucide-react';
import { useFileContext } from '../context/FileContext';

export const FileUploader = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { files, uploadFile, removeFile, activeFile, setActiveFile } = useFileContext();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'text/csv') {
        uploadFile(file);
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === 'text/csv') {
        uploadFile(file);
      }
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-700">
      <div 
        className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center mb-4 cursor-pointer transition-colors ${
          isDragging 
            ? 'border-blue-500 bg-blue-700/20' 
            : 'border-gray-700 hover:border-blue-500'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <Upload className="h-8 w-8 text-blue-500 mb-2" />
        <p className="text-sm text-center text-gray-300">
          Drag & drop a CSV file, <br />or <span className="text-blue-500">click to browse</span>
        </p>
        <input 
          id="file-upload"
          type="file" 
          accept=".csv" 
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      
      {files.length > 0 && (
        <div className="flex-1 overflow-y-auto">
          <h3 className="text-sm font-medium mb-2 text-gray-300">Uploaded Files</h3>
          <ul className="space-y-2">
            {files.map((file) => (
              <li 
                key={file.id} 
                className={`p-2 rounded-md flex items-center justify-between group hover:bg-gray-700 cursor-pointer ${
                  activeFile?.id === file.id ? 'bg-blue-900/20' : ''
                }`}
                onClick={() => setActiveFile(file)}
              >
                <div className="flex items-center space-x-2 overflow-hidden">
                  <FileText size={16} className="text-blue-500 flex-shrink-0" />
                  <span className="text-sm truncate text-white">{file.name}</span>
                  {activeFile?.id === file.id && (
                    <Check size={16} className="text-green-500 flex-shrink-0" />
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-gray-600"
                  aria-label="Remove file"
                >
                  <X size={16} className="text-gray-400" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};