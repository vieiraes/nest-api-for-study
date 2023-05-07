import { PrismaClient } from '@prisma/client';
import * as helpers from '../src/lib/helpers/seedData'


const prisma = new PrismaClient();

async function main() {
    const wallet1 = await prisma.wallet.upsert({
        where: { id: helpers.WALLET1 },
        update: {},
        create: {
            userId: helpers.USERID1,
            assets: undefined
        }
    })
    const wallet2 = await prisma.wallet.upsert({
        where: { id: helpers.WALLET2 },
        update: {},
        create: {
            userId: helpers.USERID2,
            assets: undefined
        }
    })

    const asset1 = await prisma.asset.upsert({
        where: { id: helpers.ASSET1 },
        update: {},
        create: {
            amount: helpers.AMOUNT,
            ticker: 'TEST'
        }
    })

    const asset2 = await prisma.asset.upsert({
        where: { id: helpers.ASSET2 },
        update: {},
        create: {
            amount: helpers.AMOUNT,
            ticker: 'LMTC'
        }
    })

    const user1 = await prisma.user.upsert({
        where: { id: helpers.USERID1 },
        update: {},
        create: {
            name: "Joao da Couves",
            email: helpers.EMAIL1,
            wallets: undefined
        }
    })
    const user2 = await prisma.user.upsert({
        where: { id: helpers.USERID2 },
        update: {},
        create: {
            name: "Maria Landrin",
            email: helpers.EMAIL2,
            wallets: undefined
        }
    })
    // console.log({ wallet1, wallet2, asset1, asset2, user1, user2 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })