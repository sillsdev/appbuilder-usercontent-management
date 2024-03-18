import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ params: { id } }) => {
    const request = await prisma.userManagementRequest.findUnique({
        where: { id: String(id) },
        include: { app: true }
    });
    console.log('FOUND');
    console.log(request?.id);
    return { request };
}) satisfies PageServerLoad;
