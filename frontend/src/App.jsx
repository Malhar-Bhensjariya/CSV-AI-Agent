import React, { useState } from 'react';
import { FileUploader } from './components/FileUploader';
import { ChatWindow } from './components/ChatWindow';
import { TableView } from './components/TableView';
import { AppHeader } from './components/AppHeader';
import { FileProvider } from './context/FileContext';
import { ChatProvider } from './context/ChatContext';
import './index.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <FileProvider>
      <ChatProvider>
        <div className="min-h-screen flex flex-col dark bg-gray-900">
          <AppHeader
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div
              className={`${
                sidebarOpen ? 'translate-x-0 w-80' : '-translate-x-full w-0'
              } transition-all duration-300 ease-in-out h-full dark:bg-gray-800 border-gray-200 dark:border-gray-700 md:relative absolute z-10`}
            >
              <div className="p-4 flex flex-col h-full  bg-gray-900 text-white">
                <h2 className="text-lg font-semibold mb-4 dark:text-white">Files</h2>
                <FileUploader />
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden h-screen">
                <ChatWindow />
                <TableView />
              </div>
            </div>
          </div>
        </div>
      </ChatProvider>
    </FileProvider>
  );
}

export default App;
