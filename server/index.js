import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { handleSendEmail } from './emailHandler.js';

// Load environment variables
// Try .env.local first, then fall back to .env
const envResult = dotenv.config({ path: '.env.local' });
if (envResult.error) {
  console.warn('Warning: .env.local not found, trying .env');
  dotenv.config();
} else {
  console.log('✅ Loaded .env.local');
}

// Log loaded env vars (without sensitive data) for debugging
console.log('Environment configuration:');
console.log('  AWS_REGION:', process.env.AWS_REGION || '❌ not set');
console.log('  AWS_SOURCE_EMAIL:', process.env.AWS_SOURCE_EMAIL ? '✅ set' : '❌ not set');
console.log('  AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID ? '✅ set' : '❌ not set');
console.log('  AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY ? '✅ set' : '❌ not set');
console.log('  AWS_TO_EMAIL:', process.env.AWS_TO_EMAIL || process.env.AWS_SOURCE_EMAIL || '❌ not set');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Send email endpoint - uses shared handler
app.post('/api/send-email', handleSendEmail);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
