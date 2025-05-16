import { proxyToFlask } from '../utils/fileHandler.js';

export const handleChat = async (req, res) => {
  try {
    const { message } = req.body;
    const response = await proxyToFlask('/chat', { message });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Chatbot failed' });
  }
};

export const handleCSVUpload = async (req, res) => {
  try {
    const filePath = req.file.path;
    const response = await proxyToFlask('/upload', {}, filePath);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'File upload failed' });
  }
};
