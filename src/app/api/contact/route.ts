import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { z } from "zod";

// Initialize AWS SES Client
const sesClient = new SESClient({
    region: process.env.AWS_REGION || "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Zod schema for validation
const contactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(3, "Subject must be at least 3 characters").max(150, "Subject must be under 150 characters"),
    message: z.string().min(1, "Message is required"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 1. Validate request payload
        const result = contactSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: "Validation failed", details: result.error.flatten() },
                { status: 400, headers: corsHeaders }
            );
        }

        const { name, email, subject, message } = result.data;

        // 2. Validate CAPTCHA (Server-side placeholder)
        // Note: Since the current CAPTCHA is client-generated, strict server-side validation 
        // requires a shared secret or session. For this implementation, we assume client-side 
        // verification passed if the request reaches here, or we could require the 'captcha' 
        // and 'userCaptcha' values to be sent and compared (though still client-dependent).
        // For a robust solution, consider using ReCAPTCHA or Cloudflare Turnstile.

        // 3. Send email using AWS SES
        const senderEmail = process.env.SES_SENDER_EMAIL;
        const recipientEmail = process.env.SES_RECIPIENT_EMAIL || senderEmail; // Fallback to sender if not specified

        if (!senderEmail) {
            console.error("SES_SENDER_EMAIL is not defined");
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500, headers: corsHeaders }
            );
        }

        const sendEmailCommand = new SendEmailCommand({
            Source: senderEmail,
            Destination: {
                ToAddresses: [recipientEmail as string],
            },
            Message: {
                Subject: {
                    Charset: "UTF-8",
                    Data: `New Contact Form Submission: ${subject}`,
                },
                Body: {
                    Text: {
                        Charset: "UTF-8",
                        Data: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
            `,
                    },
                    Html: {
                        Charset: "UTF-8",
                        Data: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <br/>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, "<br/>")}</p>
            `,
                    },
                },
            },
        });

        await sesClient.send(sendEmailCommand);

        return NextResponse.json(
            { message: "Email sent successfully" },
            { status: 200, headers: corsHeaders }
        );
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500, headers: corsHeaders }
        );
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200, headers: corsHeaders });
}
