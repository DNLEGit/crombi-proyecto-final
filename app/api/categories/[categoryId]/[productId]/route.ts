import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

// 👇 Tu tipo Context personalizado
type Context = {
    params: Promise<{ path: string[] }> | { path: string[] };
};

const prisma = new PrismaClient();

export async function GET(request: NextRequest, context: Context): Promise<NextResponse> {
    // 👇 Aseguramos que params no sea una promesa
    const params = await Promise.resolve(context.params);

    // Asumimos que categoryId y productId vienen en el path: ['categoryId', 'productId']
    const [productId] = params.path;

    try {
        const product = await prisma.product.findUnique({
            where: { productId },
        });

        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ product }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: (error as Error).message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
