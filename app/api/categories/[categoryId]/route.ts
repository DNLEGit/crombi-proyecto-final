"use server";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define the GET method with dynamic parameters
export async function GET(request: NextRequest,
    context: { params: Promise<{ categoryId: string }> }
) {
    const resolvedParams = await context.params;
    const { categoryId } = resolvedParams

    try {
        // Query the database to find products with the given categoryId
        const categoryProducts = await prisma.product.findMany({
            where: {
                categoryId: categoryId,
            },
        });

        // If no products are found, return a 404
        if (!categoryProducts || categoryProducts.length === 0) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }

        // If products are found, return them with a 200 status
        return NextResponse.json({ categoryProducts }, { status: 200 });
    } catch (error) {
        // In case of any error, return a 500 status with the error message
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}
