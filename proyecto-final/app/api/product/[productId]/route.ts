"use server";

import { PrismaClient } from "@prisma/client";

import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { producId: string } }) {
    const { producId: productId } = params;

    try {
        const product = await prisma.product.findUnique({
            where: {
                productId: productId,
            },
        });
        if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });
        return NextResponse.json({ product }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
export async function DELETE(request: NextRequest, { params }: { params: { productId: string } }) {
    const productId = params.productId;

    try {
        const product = await prisma.product.delete({
            where: {
                productId
            },
        });

        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { productId: string } }) {
    const productId = params.productId;

    try {
        const body = await request.json();
        const updatedProduct = await prisma.product.update({
            where: {
                productId,
            },
            data: body,
        });

        return NextResponse.json({ product: updatedProduct }, { status: 200 });
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}