// src/routes/p/[id]/+page.server.ts
import prisma from "$lib/prisma";
import type { PageServerLoad } from './$types';

// 1.
export const load = (async ({ params: { id } }) => {
    // 2.
    const app = await prisma.app.findUnique({
        where: { id: Number(id) },
        include: { listings: true },
    });

    // 3.
    return { app };
}) satisfies PageServerLoad;