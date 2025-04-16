import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: { producId: string } }
) {
    const { producId: productId } = params;
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
