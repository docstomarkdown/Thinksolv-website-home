# Vercel Deployment Guide

## Issues Fixed

1. **"Deployment not found" on refresh**: Fixed by adding SPA routing in `vercel.json`
2. **API routes**: Converted Express server to Vercel serverless functions

## Files Created/Modified

1. **vercel.json**: Configures Vercel to:
   - Serve `index.html` for all non-API routes (SPA routing)
   - Handle API routes separately
   - Set CORS headers for API routes

2. **api/send-email/index.js**: Vercel serverless function that:
   - Handles POST requests to `/api/send-email`
   - Validates reCAPTCHA
   - Sends emails via AWS SES
   - Returns proper CORS headers

## Environment Variables Required in Vercel

Add these in your Vercel project settings:

### Frontend (Public)
- `VITE_RECAPTCHA_SITE_KEY` - Your reCAPTCHA v3 site key

### Backend (Private)
- `AWS_REGION` - AWS region (e.g., `us-east-1`)
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `AWS_SOURCE_EMAIL` - Verified SES sender email
- `AWS_TO_EMAIL` - Recipient email (optional, defaults to source)
- `RECAPTCHA_SECRET_KEY` - Your reCAPTCHA v3 secret key

## How to Deploy

1. Push your code to GitHub
2. Vercel will automatically detect the changes
3. Make sure all environment variables are set in Vercel dashboard
4. The deployment will:
   - Build the Vite app (outputs to `dist/`)
   - Deploy serverless functions from `api/` directory
   - Configure routing via `vercel.json`

## Testing

After deployment:
1. Visit your site - should load fine
2. Navigate to `/contact` - should work
3. Refresh on `/contact` - should NOT show "deployment not found"
4. Submit contact form - should work with reCAPTCHA

## Local Development

For local development, the Express server (`server/index.js`) still works.
The Vercel serverless function is only used in production.

