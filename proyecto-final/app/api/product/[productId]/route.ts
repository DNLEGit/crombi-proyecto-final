"use server";

import { PrismaClient } from "@prisma/client";
import { Storage } from '@google-cloud/storage';
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();
const storage = new Storage();
const BUCKET_NAME = 'bucket-videoar';

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
//Delete product
export async function DELETE(request: NextRequest, { params }: { params: { productId: string } }) {
    const { productId: producId } = params;

    try {
        const product = await prisma.product.delete({
            where: {
                productId: producId,
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
//Edit product
export async function PUT(request: NextRequest, { params }: { params: { productId: string } }) {
    const productId = params.productId;
    const formData = await request.formData();
    const productName = formData.get("name") as String;
    const productDescription = formData.get("description") as String;
    const productStock = Number(formData.get("stock"));
    const productPrice = Number(formData.get("price"));
    const productImage = formData.get("image") as File;

    const product = await prisma.product.findUnique({
        where:
            { productId: productId }
    });
    if (!product) return NextResponse.json({ error: 'product not found' }, { status: 404 });



    let imageUrl: string | undefined;

    if (productImage) {
        const arrayBuffer = await productImage?.arrayBuffer(); // 👈 Ensure userImage is a File or Blob
        const buffer = Buffer.from(arrayBuffer);
        const fileName = `${product.productId}-${Date.now()}.jpg`; // Generate a unique file name
        const file = storage.bucket(BUCKET_NAME).file(fileName);
        await file.save(Buffer.from(buffer), {
            metadata: { contentType: 'image/jpeg' }, // Adjust content type if needed
            public: true,
        });
        imageUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${fileName}`;
    }

    try {

        const updatedProduct = await prisma.product.update({
            where: {
                productId: product.productId

            },
            data: {
                name: product.name || productName?.toString(),
                image: product.image || imageUrl,
                description: product.description || productDescription?.toString(),
                price: product.price || productPrice,
                stock: product.stock || productStock,
            },

        });

        return NextResponse.json({ product: updatedProduct }, { status: 200 });
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}