import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, RequestEvent } from './$types';

export const load = (async ({ params: { id } }) => {
    const request = await prisma.userManagementRequest.findUnique({
        where: { id: String(id) },
        include: { app: true }
    });
    return { request };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, params }: RequestEvent) => {
        const userRequest = await prisma.userManagementRequest.findUnique({
            where: { id: String(params.id) }
        });

        if (!userRequest) {
            return { error: 'Request not found.' };
        }

        try {
            const formData = await request.formData();
            const userInputCode =
                String(formData.get('input-0')) +
                String(formData.get('input-1')) +
                String(formData.get('input-2')) +
                String(formData.get('input-3')) +
                String(formData.get('input-4')) +
                String(formData.get('input-5'));
            if (userInputCode === userRequest.confirmationCode) {
                await prisma.userManagementRequest.update({
                    where: { id: userRequest.id },
                    data: { dateConfirmed: new Date() }
                });
            } else {
                return { error: 'Invalid code.' };
            }
        } catch (error) {
            return { error: 'An error occurred while processing your request.' };
        }
        throw redirect(302, `/request/${userRequest?.id}`);
    }
};
