"use server";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { categoryId: string } }) {
    const { categoryId } = params;
    try {
        const categoryProducts = await prisma.product.findMany({
            where: {
                categoryId: categoryId,
            },
        });
        if (!categoryProducts) return NextResponse.json({ message: "Category not found" }, { status: 404 });
        return NextResponse.json({ categoryProducts }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}