// Shared email handler logic used by both Express server and Vercel serverless function
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

// Initialize SES Client
const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export async function handleSendEmail(req, res) {
  try {
    const { name, email, subject, message, captcha } = req.body;

    console.log('\n📧 Received email request:');
    console.log('  Name:', name);
    console.log('  Email:', email);
    console.log('  Subject:', subject);
    console.log('  Message length:', message?.length || 0, 'characters');

    // 1. Validate Payload
    if (!name || !email || !subject || !message) {
      console.error('❌ Validation failed: Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 2. Validate CAPTCHA (Server-Side)
    if (!captcha) {
      console.error('❌ CAPTCHA token missing');
      return res.status(400).json({ error: 'CAPTCHA token missing' });
    }

    if (!process.env.RECAPTCHA_SECRET_KEY) {
      console.warn('⚠️ RECAPTCHA_SECRET_KEY is not set. Skipping CAPTCHA validation.');
    } else {
      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`;

      try {
        const recaptchaRes = await fetch(verifyUrl, { method: 'POST' });
        const recaptchaJson = await recaptchaRes.json();

        console.log('reCAPTCHA v3 response:', recaptchaJson);

        if (!recaptchaJson.success || recaptchaJson.score < 0.5) {
          console.error('❌ reCAPTCHA validation failed:', recaptchaJson);
          const errorCode = recaptchaJson['error-codes'] ? recaptchaJson['error-codes'][0] : 'low-score';
          return res.status(400).json({
            error: `CAPTCHA verification failed: ${errorCode}`,
          });
        }
        console.log('✅ reCAPTCHA verified successfully. Score:', recaptchaJson.score);
      } catch (error) {
        console.error('❌ reCAPTCHA verification error:', error);
        return res.status(500).json({ error: 'CAPTCHA verification failed' });
      }
    }

    // 3. Send Email via AWS SES
    const sourceEmail = process.env.AWS_SOURCE_EMAIL;
    const toEmail = process.env.AWS_TO_EMAIL || sourceEmail;

    if (!sourceEmail) {
      console.error('AWS_SOURCE_EMAIL is not defined');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const command = new SendEmailCommand({
      Source: sourceEmail,
      Destination: {
        ToAddresses: [toEmail],
      },
      ReplyToAddresses: [email],
      Message: {
        Subject: {
          Data: subject,
          Charset: 'UTF-8',
        },
        Body: {
          Text: {
            Data: `You have received a new message from the contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            Charset: 'UTF-8',
          },
        },
      },
    });

    await sesClient.send(command);

    console.log('✅ Email sent successfully to:', toEmail);
    return res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error in send-email API:', error);
    return res.status(500).json({
      error: 'Failed to send email. Please try again later.',
    });
  }
}
