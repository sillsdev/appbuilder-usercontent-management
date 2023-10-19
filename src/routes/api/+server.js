import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { json } = await request.json();
    console.log(json)
    return new Response(null, { status: 201 });
}