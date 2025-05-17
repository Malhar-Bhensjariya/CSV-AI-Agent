import React, { createContext, useContext, useState } from 'react';
import Papa from 'papaparse';
const FileContext = createContext(undefined);

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${import.meta.env.VITE_FLASK_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Upload failed');
      }

      const { filename } = await res.json();

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const headers = results.meta.fields;
          const rows = results.data.map(row => Object.values(row));

          const newFile = {
            id: Date.now().toString(),
            name: filename,
            size: file.size,
            uploadedAt: new Date(),
            data: { headers, rows },
          };

          setFiles((prev) => [...prev, newFile]);
          setActiveFile(newFile);
        }
      });
    } catch (err) {
      console.error('File upload failed:', err.message);
    }
  };

  const removeFile = (id) => {
    const updated = files.filter((file) => file.id !== id);
    setFiles(updated);
    if (activeFile?.id === id) {
      setActiveFile(updated.length > 0 ? updated[0] : null);
    }
  };

  const updateFileFromCSV = async (filename, csvFile) => {
    return new Promise((resolve) => {
      Papa.parse(csvFile, {
        complete: (results) => {
          const headers = results.meta.fields;
          const rows = results.data.map(row => Object.values(row));
          
          setFiles(prev => prev.map(file => 
            file.name === filename ? { ...file, data: { headers, rows } } : file
          ));
          
          setActiveFile(prev => prev?.name === filename ? 
            { ...prev, data: { headers, rows } } : prev
          );
          resolve();
        },
        header: true,
        skipEmptyLines: true
      });
    });
  };

  return (
    <FileContext.Provider
      value={{ files, activeFile, uploadFile, removeFile, setActiveFile, updateFileFromCSV }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFileContext must be used within a FileProvider');
  }
  return context;
};
