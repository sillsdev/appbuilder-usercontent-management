// src/routes/p/[id]/+page.server.ts
import prisma from '$lib/prisma';
import type { PageServerLoad, RequestEvent } from './$types';
import { postUserChange } from '$lib/scriptoria';
import { fail } from '@sveltejs/kit';

export const load = (async ({ params: { id } }) => {
    const app = await prisma.userManagementRequest.findUnique({
        where: { id: String(id) },
        include: { app: true }
    });
    return { app };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, params: { id } }: RequestEvent) => {
        console.log(id);
        const userChange = await prisma.userManagementRequest.findUnique({
            where: { id: String(id) },
            include: { app: true }
        });
        console.log(userChange);
        if (userChange === null) {
            return fail(404);
        }
        try {
            const formData = await request.formData();
            const option = String(formData.get('option'));

            const updatedUserChange = await prisma.userManagementRequest.update({
                where: { id: userChange.id },
                data: { changeRequest: option }
            });

            await postUserChange(updatedUserChange, userChange.app);
            console.log(option);
        } catch (error) {
            return fail(500);
        }
    }
};
