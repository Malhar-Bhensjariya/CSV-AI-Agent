import express from 'express';
import multer from 'multer';
import {
  handleChat,
  handleCSVUpload
} from '../controllers/chatbotController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // temp upload location

router.post('/chat', handleChat);
router.post('/upload', upload.single('csv'), handleCSVUpload);

export default router;
