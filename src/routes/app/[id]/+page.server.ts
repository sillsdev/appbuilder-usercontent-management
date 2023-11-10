// src/routes/p/[id]/+page.server.ts
import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';
import transporter from '$lib/mailer';
import { EMAIL_FROM } from '$env/static/private';
import type { Options } from 'nodemailer/lib/mailer';

export const load = (async ({ params: { id } }) => {
    const app = await prisma.app.findUnique({
        where: { appId: String(id) },
        include: { listings: true }
    });
    return { app };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request }: { request : any}) => {
        try {
            const formData = await request.formData();
            const email = formData.get("to");
            const message = {
                from: EMAIL_FROM,
                to: email,
                subject: "Email Verification",
                text: "Click the link below to verify your email:",
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
                
                         <br /> Click the link below to confirm your email address:
                        </p>
                
                        <a href="#" style="background-color: #0077b6; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 20px 0; cursor: pointer; border-radius: 4px;">
                            Verify Now
                        </a>
                
                
                        <p>
                            This verification link will expire in 24 hours. -From Team SIL
                        </p>
                    </div>
                
                </body>
                </html>`
            };

            const sendEmail = async (message: Options) => {
                await new Promise((resolve, reject) => {
                    transporter.sendMail(message, (err, info) => {
                        if (err) {
                            console.error(err);
                            reject(err);
                        } else {
                            resolve(info);
                        }
                    });
                });
            };

            await sendEmail(message);
            return {
                success: "Email is sent",
            };
        } catch (error) {
            console.error(error);
        }
    }
};