// src/routes/p/[id]/+page.server.ts
import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';
import transporter from '$lib/mailer';

export const load = (async ({ params: { id } }) => {
    const app = await prisma.app.findUnique({
        where: { appId: String(id) },
        include: { listings: true }
    });

    transporter.sendMail({
        from: 'usercontenttest@gmail.com', // sender address
        to: 'jaeminlee2001@gmail.com', // list of receivers
        subject: "Email Verification", // Subject line
        text: "Click the link below to verify your email:", // plain text body
      });

    return { app };
}) satisfies PageServerLoad;
