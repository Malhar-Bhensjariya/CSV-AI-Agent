export const proxyToFlask = async (endpoint, body = {}, filePath = null) => {
  try {
    let response;
    
    if (filePath) {
      const form = new FormData();
      form.append('file', fs.createReadStream(filePath));
      
      response = await axios.post(`${FLASK_URL}${endpoint}`, form, {
        headers: { ...form.getHeaders(), 'X-Proxy-Source': 'Node' }
      });
    } else {
      response = await axios.post(`${FLASK_URL}${endpoint}`, body, {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    if (filePath) fs.unlinkSync(filePath);
    
    return response.data;
  } catch (error) {
    console.error(`Proxy error: ${error.message}`);
    throw new Error(error.response?.data?.error || 'Backend service unavailable');
  }
};