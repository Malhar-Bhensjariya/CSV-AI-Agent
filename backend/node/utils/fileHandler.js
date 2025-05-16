import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

const FLASK_URL = process.env.FLASK_URL || 'http://localhost:5001';

export const proxyToFlask = async (endpoint, body = {}, filePath = null) => {
  if (filePath) {
    const form = new FormData();
    form.append('csv', fs.createReadStream(filePath));

    const response = await axios.post(`${FLASK_URL}${endpoint}`, form, {
      headers: form.getHeaders()
    });

    return response.data;
  } else {
    const response = await axios.post(`${FLASK_URL}${endpoint}`, body);
    return response.data;
  }
};
