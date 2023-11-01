// src/routes/p/[id]/+page.server.ts
import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';
import transporter from '$lib/mailer';
import { PUBLIC_EMAIL_FROM } from '$env/static/public';

export const load = (async ({ params: { id } }) => {
    const app = await prisma.app.findUnique({
        where: { appId: String(id) },
        include: { listings: true }
    });

    console.log('Emailing to Jae to verify link');

    transporter.sendMail({
        from: PUBLIC_EMAIL_FROM, // sender address
        to: 'jaeminlee2001@gmail.com', // list of receivers
        subject: 'Email Verification', // Subject line
        text: 'Click the link below to verify your email:' // plain text body
    });

    return { app };
}) satisfies PageServerLoad;
