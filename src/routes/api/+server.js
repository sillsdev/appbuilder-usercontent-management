import prisma from '$lib/prisma';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const data = await request.json();
    await prisma.app.upsert({
        where: {
            appId: data.appId
        },
        create: data,
        update: {
            appIcon: data.appIcon,
            googlePlayUrl: data.googlePlayUrl,
            listings: data.listings
        }
    });
    return new Response(null, { status: 201 });
}