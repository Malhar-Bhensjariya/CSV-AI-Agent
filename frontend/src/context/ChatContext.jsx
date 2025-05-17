import React, { createContext, useContext, useState } from 'react';
import { useFileContext } from './FileContext';
import Papa from 'papaparse';

const ChatContext = createContext(undefined);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { activeFile, updateFileFromCSV } = useFileContext();

  const parseCSVResponse = async (csvFile) => {
    return new Promise((resolve, reject) => {
      Papa.parse(csvFile, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(new Error('Error parsing CSV file'));
            return;
          }
          resolve({
            headers: results.meta.fields,
            rows: results.data.map(row => Object.values(row))
          });
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  };

  const sendMessage = async (content) => {
    if (!activeFile) {
      setMessages(prev => [
        ...prev,
        { role: 'user', content },
        { role: 'assistant', content: 'Please upload a CSV file to start asking questions.' }
      ]);
      return;
    }

    const userMessage = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      // Send query to backend
      const res = await fetch(`${import.meta.env.VITE_FLASK_URL}/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: activeFile.name,
          question: content,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.statusText}`);
      }

      // Get text response from headers
      const responseText = res.headers.get('X-Query-Response') || 'Operation completed successfully';

      // Process CSV file from response
      const csvBlob = await res.blob();
      const csvFile = new File([csvBlob], activeFile.name, {
        type: 'text/csv'
      });

      // Parse CSV and update file context
      const parsedData = await parseCSVResponse(csvFile);
      await updateFileFromCSV(activeFile.name, csvFile);

      // Create assistant message
      const assistantMessage = { 
        role: 'assistant', 
        content: responseText,
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Error processing query:', error);
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: error.message || 'An error occurred while processing your request'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, loading, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};