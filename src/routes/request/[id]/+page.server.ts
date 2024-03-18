// src/routes/request/[id]/+page.server.ts
import prisma from '$lib/prisma';
import type { UserManagementRequest, App } from '@prisma/client';
import { SCRIPTORIA_API_TOKEN, SCRIPTORIA_API_URL } from '$env/static/private';
import type { PageServerLoad, RequestEvent } from './$types';
import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

async function postUserChange(request: UserManagementRequest, app: App) {
    const payload = {
        data: {
            type: 'product-user-changes',
            attributes: {
                email: request.email,
                change: request.changeRequest
            },
            relationships: {
                product: {
                    data: {
                        type: 'products',
                        id: app.appId
                    }
                }
            }
        }
    };

    try {
        const response = await fetch(`${SCRIPTORIA_API_URL}/api/product-user-change`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${SCRIPTORIA_API_TOKEN}`,
                'Content-Type': 'application/vnd.api+json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log('Request successful. Response: 201 Created', response);
        } else {
            console.error('Request failed. Response: 500 internal server error', response);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

export const load = (async ({ params: { id } }) => {
    const request = await prisma.userManagementRequest.findUnique({
        where: { id: String(id) },
        include: { app: true }
    });

    const app = await prisma.app.findUnique({
        where: { id: request?.appId },
        include: { listings: true }
    });
    console.log('loading app object: ', app);
    return { request, app };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, params: { id } }: RequestEvent) => {
        const userChange = await prisma.userManagementRequest.findUnique({
            where: { id: String(id) },
            include: { app: true }
        });

        if (userChange === null) {
            return fail(404);
        }
        let confirmationId = '';

        try {
            const formData = await request.formData();
            const option = String(formData.get('option'));

            const updatedUserChange = await prisma.userManagementRequest.update({
                where: { id: userChange.id },
                data: { changeRequest: option }
            });

            await postUserChange(updatedUserChange, userChange.app);

            confirmationId = updatedUserChange.id;
        } catch (error) {
            return fail(500);
        }
        throw redirect(301, `/confirmation/${confirmationId}`);
    }
};
