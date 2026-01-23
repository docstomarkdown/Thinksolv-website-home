# How to Copy Environment Variables from Vercel

Since `.env.local` files are gitignored, your actual values are likely stored in Vercel. Here's how to get them:

## Option 1: Vercel Dashboard (Easiest)

1. Go to your Vercel dashboard: https://vercel.com
2. Select your Next.js project (`Thinksolv-website-home-next-js-latest`)
3. Go to **Settings** → **Environment Variables**
4. Copy the following variables:
   - `AWS_REGION`
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_SOURCE_EMAIL`
   - `AWS_TO_EMAIL`
   - `RECAPTCHA_SECRET_KEY` (if used)
   - `NEXT_PUBLIC_UTM_SOURCE_MAP` (if used - note: convert to `VITE_UTM_SOURCE_MAP`)

5. Paste them into `.env.local` in this project

## Option 2: Vercel CLI

If you have Vercel CLI installed:

```bash
# Install Vercel CLI if needed
npm i -g vercel

# Login to Vercel
vercel login

# Link to your project (if not already linked)
cd /Users/vikram/GitHub/Thinksolv-website-home-next-js-latest
vercel link

# Pull environment variables
vercel env pull .env.local

# Copy to current project
cp .env.local /Users/vikram/GitHub/THinksolv_Minimal_home_new/.env.local

# Convert NEXT_PUBLIC_ to VITE_ for UTM mapping
cd /Users/vikram/GitHub/THinksolv_Minimal_home_new
sed -i '' 's/NEXT_PUBLIC_UTM_SOURCE_MAP/VITE_UTM_SOURCE_MAP/g' .env.local
```

## Option 3: Manual Copy

If you have the values stored locally somewhere else, just paste them into `.env.local` in this project.

## Required Variables

Make sure your `.env.local` has these (at minimum):

```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key_here
AWS_SECRET_ACCESS_KEY=your_secret_here
AWS_SOURCE_EMAIL=your_verified_email@example.com
AWS_TO_EMAIL=recipient@example.com
PORT=3001
```

## Note

- `NEXT_PUBLIC_*` variables in Next.js become `VITE_*` in Vite
- The `PORT` variable is for the Express server (backend)
- Make sure your AWS SES email addresses are verified
