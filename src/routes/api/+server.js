import prisma from '$lib/prisma';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const data = await request.json();

    // Check if the App exists in the database based on the appId
    let existingApp = await prisma.app.findUnique({
        where: { appId: data.appId }
    });

    if (existingApp) {
        // Update app if it already exists
        existingApp = await prisma.app.update({
            where: { id: existingApp.id },
            data: {
                appIcon: data.appIcon,
                googlePlayUrl: data.googlePlayUrl
            }
        });
    } else {
        // Create app if it already exists
        existingApp = await prisma.app.create({
            data: {
                appId: data.appId,
                appIcon: data.appIcon,
                googlePlayUrl: data.googlePlayUrl
            }
        });
    }

    // Get all the existing Listings for this App
    const existingListings = await prisma.listing.findMany({
        where: { appId: existingApp.id }
    });

    // Create a Set of lang values from the incoming JSON
    const newLangs = new Set(
        data.listings.map((/** @type {{ lang: any; }} */ listing) => listing.lang)
    );

    // Filter the existing Listings to find the ones that are not present in the incoming JSON
    const listingsToDelete = existingListings.filter(
        (existingListing) => !newLangs.has(existingListing.lang)
    );

    // Delete the Listings that should be removed
    for (const listingToDelete of listingsToDelete) {
        await prisma.listing.delete({
            where: { id: listingToDelete.id }
        });
    }

    // Iterate over the listings and insert or update them
    for (const listingData of data.listings) {
        const { lang, title, shortDescription, fullDescription } = listingData;
        let existingListing = await prisma.listing.findFirst({
            where: { appId: existingApp.id, lang: lang }
        });

        if (existingListing) {
            // Update listing if it already exists
            await prisma.listing.update({
                where: { id: existingListing.id },
                data: {
                    title,
                    shortDescription,
                    fullDescription
                }
            });
        } else {
            // Create a new listing if it does not exist
            await prisma.listing.create({
                data: {
                    lang,
                    title,
                    shortDescription,
                    fullDescription,
                    appId: existingApp.id
                }
            });
        }
    }

    return new Response(null, { status: 200 });
}
