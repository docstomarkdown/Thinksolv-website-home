// Vercel serverless function - applying for leave (see ../server/leaveHandler.js)
import express from 'express';
import cors from 'cors';
import { handleLeaveApply } from '../server/leaveHandler.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.post('/api/leave-apply', handleLeaveApply);

export default app;
