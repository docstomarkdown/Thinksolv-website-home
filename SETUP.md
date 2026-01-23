# Email Setup Instructions

## AWS SES Configuration

1. **Copy the environment template:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Fill in your AWS SES credentials in `.env.local`:**
   - `AWS_REGION`: Your AWS region (e.g., `us-east-1`)
   - `AWS_ACCESS_KEY_ID`: Your AWS access key ID
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key
   - `AWS_SOURCE_EMAIL`: Your verified SES sender email address
   - `AWS_TO_EMAIL`: Recipient email (defaults to source email if not set)

3. **Optional - reCAPTCHA Configuration:**
   - Add `RECAPTCHA_SECRET_KEY` if you want to enable reCAPTCHA verification

4. **Optional - UTM Source Mapping:**
   - Add `VITE_UTM_SOURCE_MAP` as a JSON string for custom UTM source mappings
   - Example: `VITE_UTM_SOURCE_MAP={"custom_source": "Custom Subject"}`

## Running the Application

### Development Mode (Frontend + Backend)

Run both the frontend and backend together:
```bash
npm run dev:all
```

Or run them separately:
```bash
# Terminal 1: Backend server
npm run dev:server

# Terminal 2: Frontend
npm run dev
```

The backend server runs on `http://localhost:3001`
The frontend runs on `http://localhost:5173` (or the port Vite assigns)

### Production Build

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Run the backend server:
   ```bash
   npm run dev:server
   ```

## Query Parameters

The contact form supports the following query parameters:

- `?subject=Your Subject` - Pre-fills the subject field
- `?utm_source=extension_a` - Maps to a predefined subject or formats dynamically

### UTM Source Handling

1. Checks environment variable mapping (`VITE_UTM_SOURCE_MAP`)
2. Checks hardcoded mapping in `Contact.jsx`
3. Falls back to dynamic formatting (replaces hyphens/underscores with spaces and capitalizes)

## API Endpoint

The email sending endpoint is available at:
- Development: `http://localhost:3001/api/send-email`
- Production: Configure your production API URL via `VITE_API_ENDPOINT` environment variable

## Notes

- The `.env.local` file is gitignored and should not be committed
- Make sure your AWS SES email addresses are verified in the AWS console
- The backend server must be running for the contact form to work
