import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // Hash passwords
    const adminPassword = await hash('admin123', 10);
    const clientPassword = await hash('client123', 10);

    // Create Roles
    const adminRole = await prisma.role.upsert({
        where: { roleName: 'Admin' },
        update: {},
        create: {
            roleName: 'Admin',
        },
    });

    const clientRole = await prisma.role.upsert({
        where: { roleName: 'Client' },
        update: {},
        create: {
            roleName: 'Client',
        },
    });

    // Create Admin User
    await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            name: 'Admin',
            email: 'admin@example.com',
            password: adminPassword,
            roleId: adminRole.roleId,
        },
    });

    // Create Random Client Users
    const clientUsers = Array.from({ length: 5 }).map((_, i) => ({
        name: `Client ${i + 1}`,
        email: `client${i + 1}@example.com`,
        password: clientPassword,
        roleId: clientRole.roleId,
    }));

    await prisma.user.createMany({ data: clientUsers });

    console.log('Seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
