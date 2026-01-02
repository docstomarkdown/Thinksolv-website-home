import { NextResponse } from 'next/server';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

// Initialize SES Client
// Ensure AWS_REGION, AWS_ACCESS_KEY_ID, and AWS_SECRET_ACCESS_KEY are set in environment variables
const sesClient = new SESClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message, captcha, userCaptcha } = body;

        // 1. Validate Payload
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 2. Validate CAPTCHA (Server-Side)
        if (!captcha) {
            return NextResponse.json(
                { error: 'CAPTCHA token missing' },
                { status: 400 }
            );
        }

        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`;

        try {
            const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
            const recaptchaJson = await recaptchaRes.json();

            // v3 returns a score (0.0 to 1.0)
            console.log("reCAPTCHA v3 response:", recaptchaJson);

            if (!recaptchaJson.success || recaptchaJson.score < 0.5) {
                console.error("reCAPTCHA validation failed:", recaptchaJson);
                const errorCode = recaptchaJson['error-codes'] ? recaptchaJson['error-codes'][0] : 'low-score';
                return NextResponse.json(
                    { error: `CAPTCHA verification failed: ${errorCode}` },
                    { status: 400 }
                );
            }
        } catch (error) {
            console.error("reCAPTCHA verification error:", error);
            return NextResponse.json(
                { error: 'CAPTCHA verification failed' },
                { status: 500 }
            );
        }

        // 3. Send Email via AWS SES
        const sourceEmail = process.env.AWS_SOURCE_EMAIL;
        const toEmail = process.env.AWS_TO_EMAIL || sourceEmail; // Default to sending to self if not specified

        if (!sourceEmail) {
            console.error('AWS_SOURCE_EMAIL is not defined');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const command = new SendEmailCommand({
            Source: sourceEmail,
            Destination: {
                ToAddresses: [toEmail!],
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

        return NextResponse.json({ success: true, message: 'Email sent successfully' });

    } catch (error: any) {
        console.error('Error in send-email API:', error);
        // Return a generic error to the client, but log the details
        return NextResponse.json(
            { error: 'Failed to send email. Please try again later.' },
            { status: 500 }
        );
    }
}
