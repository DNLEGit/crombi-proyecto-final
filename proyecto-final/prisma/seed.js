/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// List of famous dictator names and their corresponding emails
const dictatorUsers = [
    { name: 'Joseph Stalin', email: 'stalin@example.com' },
    { name: 'Adolf Hitler', email: 'hitler@example.com' },
    { name: 'Benito Mussolini', email: 'mussolini@example.com' },
    { name: 'Mao Zedong', email: 'mao@example.com' },
    { name: 'Kim Jong-un', email: 'kimjongun@example.com' },
    { name: 'Fidel Castro', email: 'castro@example.com' },
    { name: 'Saddam Hussein', email: 'saddam@example.com' },
    { name: 'Muammar Gaddafi', email: 'gaddafi@example.com' },
    { name: 'Vladimir Putin', email: 'putin@example.com' },
    { name: 'Hugo Chávez', email: 'chavez@example.com' },
];

async function main() {
    console.log('🌱 Starting database seeding...');

    // Create the admin user
    const adminUser = await prisma.user.create({
        data: {
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'admin123', // Ensure to hash it before storing in production
            role: 'ADMIN',
        },
    });

    console.log('👑 Admin user created:', adminUser);

    // Create dictator client users
    const dictatorUserData = dictatorUsers.map((dictator) => ({
        name: dictator.name,
        email: dictator.email,
        password: 'client123', // Ensure to hash it before storing in production
        role: 'USER',
    }));

    const createdUsers = await prisma.user.createMany({
        data: dictatorUserData,
    });
    const categories = await prisma.category.createMany({
        data: [
            { name: "Games" },
            { name: "Consoles" },
            { name: "Keyboards" },
            { name: "Mouses" },
            { name: "Joysticks" },

        ],
    });

    console.log(`👥 ${createdUsers.count} dictator users created`);

    console.log('✅ Seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });