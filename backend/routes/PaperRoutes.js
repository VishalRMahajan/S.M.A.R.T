import express from 'express';
import { uploadPaper, getUploadedPaper } from '../controllers/PaperController.js';
import { verifyToken } from '../Middleware/verifyToken.js';

const PaperRouter = express.Router();

PaperRouter.post('/upload', verifyToken, uploadPaper);
PaperRouter.get('/uploaded', getUploadedPaper);

export default PaperRouter;