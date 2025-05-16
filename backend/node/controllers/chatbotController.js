export const handleChat = async (req, res) => {
  try {
    const { filename, question } = req.body;
    
    if (!filename || !question) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const response = await proxyToFlask('/query', { filename, question });
    res.json(response);
  } catch (error) {
    res.status(500).json({ 
      error: error.message || 'Chat processing failed',
      details: error.response?.data?.details 
    });
  }
};

export const handleCSVUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const response = await proxyToFlask('/upload', {}, req.file.path);
    res.json(response);
  } catch (error) {
    res.status(500).json({ 
      error: error.message || 'File upload failed',
      details: error.response?.data?.details
    });
  }
};