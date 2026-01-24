// Vercel serverless function - uses shared email handler
import express from 'express';
import cors from 'cors';
import { handleSendEmail } from '../server/emailHandler.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Send email endpoint - uses shared handler
app.post('/api/send-email', handleSendEmail);

// Export the Express app for Vercel
export default app;
