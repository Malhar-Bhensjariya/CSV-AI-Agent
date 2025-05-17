import React from 'react';
import { Menu, X, FileSpreadsheet } from 'lucide-react';

export const AppHeader = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-700"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
        </button>
        <div className="flex items-center space-x-2">
          <FileSpreadsheet className="h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-bold text-white">CSV Editor</h1>
        </div>
      </div>
      <div>
        <a 
          href="https://github.com/Malhar-Bhensjariya/CSV-AI-Agent" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-gray-300 hover:text-blue-400 transition-colors"
        >
          Documentation
        </a>
      </div>
    </header>
  );
};
