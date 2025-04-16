/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Lista de jugadores de básquet conocidos
const basketballUsers = [
    { name: 'Michael Jordan', email: 'mjordan@example.com' },
    { name: 'LeBron James', email: 'lebron@example.com' },
    { name: 'Kobe Bryant', email: 'kobe@example.com' },
    { name: 'Stephen Curry', email: 'scurry@example.com' },
    { name: 'Shaquille O\'Neal', email: 'shaq@example.com' },
    { name: 'Kevin Durant', email: 'kdurant@example.com' },
    { name: 'Giannis Antetokounmpo', email: 'giannis@example.com' },
    { name: 'Luka Dončić', email: 'luka@example.com' },
    { name: 'Nikola Jokić', email: 'jokic@example.com' },
    { name: 'Magic Johnson', email: 'magic@example.com' },
];

async function main() {
    console.log('🏀 Starting database seeding...');

    const adminUser = await prisma.user.create({
        data: {
            name: 'Admin User',
            email: 'admin@example.com',
            imageUrl: "https://storage.googleapis.com/bucket-videoar/3caf85ad-c2c8-41b1-b055-ec1475275f2f-1744210229787.jpg",
            password: await bcrypt.hash("admin123", 10),
            role: 'ADMIN',
        },
    });

    console.log('👑 Admin user created:', adminUser);

    const basketballUserData = await Promise.all(
        basketballUsers.map(async (player) => ({
            name: player.name,
            email: player.email,
            imageUrl: "https://storage.googleapis.com/bucket-videoar/cca86d9c-77a6-4b0d-850f-c217d68d3d2d-1744215630895.jpg",
            password: await bcrypt.hash('client123', 10),
            role: 'USER',
        }))
    );

    const createdUsers = await prisma.user.createMany({
        data: basketballUserData,
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

    console.log(`🏀 ${createdUsers.count} basketball users created`);
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
