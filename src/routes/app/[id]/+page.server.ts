// src/routes/p/[id]/+page.server.ts
import prisma from '$lib/prisma';
import type { PageServerLoad, RequestEvent } from './$types';
import transporter from '$lib/mailer';
import { EMAIL_FROM } from '$env/static/private';
import type { Options } from 'nodemailer/lib/mailer';
import { fail } from '@sveltejs/kit';

// Function to generate a six-digit confirmation code
function generateConfirmationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const load = (async ({ params: { id } }) => {
    const app = await prisma.app.findUnique({
        where: { appId: String(id) },
        include: { listings: true }
    });
    return { app };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request }: RequestEvent) => {
        try {
            const formData = await request.formData();
            const email = formData.get('to');
            if (email !== '' && typeof email === 'string') {
                const confirmationCode = generateConfirmationCode();

                const message: Options = {
                    from: EMAIL_FROM,
                    to: email,
                    subject: 'Email Verification',
                    text: `Your verification code is: ${confirmationCode}`,
                    html: `<!DOCTYPE html>
                <html>
                <head>
                    <title>Email Confirmation</title>
                </head>
                <body style="font-family: Arial, sans-serif; text-align: center;">
                
                    <div style="max-width: 600px; margin: auto; padding: 20px;">
                        <h1 style="font-size: 48px; color: #0077b6;">Verification</h1>
                
                        <p style="font-size: 24px;">Hello [email address],</p>
                
                        <p style="line-height: 2;">
                            Thanks for typing in your email! 
                            <br /> Your verification code is: ${confirmationCode}
                        </p>
                
                        <p>
                            This verification code will expire in 24 hours. -From Team SIL
                        </p>
                    </div>
                
                </body>
                </html>`
                };

                transporter.sendMail(message, (err) => {
                    if (err) {
                        console.error(err);
                        return { success: false };
                    }
                });

                return {
                    success: 'Email is sent'
                };
            } else {
                return fail(500);
            }
        } catch (error) {
            return fail(500);
        }
    }
};
