import type { UserManagementRequest, App } from '@prisma/client';
import { SCRIPTORIA_API_TOKEN, SCRIPTORIA_API_URL } from '$env/static/private';

export async function postUserChange(request: UserManagementRequest, app: App) {
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
