// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import appData from "./data.json" assert { type: "json" }

const prisma = new PrismaClient()

async function main() {
    console.log(`Start seeding ...`)

    for (const a of appData) {
        const app = await prisma.app.create({
            data: {
                appId: a.appId,
                appIcon: a.appIcon,
                googlePlayUrl: a.googlePlayUrl,
                listings: {
                    create: [
                        {
                            lang: a.listings[0].lang,
                            title: a.listings[0].title,
                            shortDescription: a.listings[0].shortDescription,
                            fullDescription: a.listings[0].fullDescription,
                        },
                        {
                            lang: a.listings[1].lang,
                            title: a.listings[1].title,
                            shortDescription: a.listings[1].shortDescription,
                            fullDescription: a.listings[1].fullDescription,
                        }
                    ],
                },
            }
        })
        console.log(`Created user with id: ${app.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })