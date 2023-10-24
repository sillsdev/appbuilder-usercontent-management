import prisma from '$lib/prisma';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const data = await request.json();

    // Check if the App exists in the database based on the appId
    let existingApp = await prisma.app.findUnique({
        where: { appId: data.appId },
    });

    if (existingApp) {
        // If the App exists, update it
        existingApp = await prisma.app.update({
            where: { id: existingApp.id },
            data: {
                appIcon: data.appIcon,
                googlePlayUrl: data.appIcon,
            },
        });
    } else {
        // If the App doesn't exist, create a new App record
        existingApp = await prisma.app.create({
            data: {
                appId: data.appId,
                appIcon: data.appIcon,
                googlePlayUrl: data.googlePlayUrl,
            },
        });
    }

    // Get all the existing Listings for this App
    const existingListings = await prisma.listing.findMany({
        where: { appId: existingApp.id },
    });

    // Create a Set of lang values from the incoming JSON
    const newLangs = new Set(data.listings.map((/** @type {{ lang: any; }} */ listing) => listing.lang));

    // Filter the existing Listings to find the ones that are not present in the incoming JSON
    const listingsToDelete = existingListings.filter(
        (existingListing) => !newLangs.has(existingListing.lang)
    );

    // Delete the Listings that should be removed
    for (const listingToDelete of listingsToDelete) {
        await prisma.listing.delete({
            where: { id: listingToDelete.id },
        });
    }

    // Iterate over the listings and insert or update them
    for (const listingData of data.listings) {
        const { lang, title, shortDescription, fullDescription } = listingData;

        let existingListing = await prisma.listing.findUnique({
            where: { id: existingApp.id },
        });

        if (existingListing) {
            // If the Listing exists, update it
            existingListing = await prisma.listing.update({
                where: { id: existingListing.id },
                data: {
                    lang,
                    title,
                    shortDescription,
                    fullDescription,
                },
            });
        } else {
            // If the Listing doesn't exist, create a new Listing record
            await prisma.listing.create({
                data: {
                    lang,
                    title,
                    shortDescription,
                    fullDescription,
                    appId: existingApp.id,
                },
            });
        }
    }

    return new Response(null, { status: 201 });
}