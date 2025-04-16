"use server";

import { PrismaClient } from "@prisma/client";

import { NextResponse, NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { productId: string } }
) {
    const { productId } = params;
    const prisma = new PrismaClient();

    try {
        const product = await prisma.product.findUnique({
            where: { productId },
        });

        if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });
        return NextResponse.json({ product }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

