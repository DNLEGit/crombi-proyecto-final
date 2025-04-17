"use server";

import { PrismaClient } from "@prisma/client";
import { Storage } from '@google-cloud/storage';
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();
const storage = new Storage();
const BUCKET_NAME = 'bucket-videoar';

export async function GET(request: NextRequest,
    context: { params: Promise<{ productId: string }> }
) {

    const resolvedParams = await context.params;
    const { productId } = resolvedParams

    try {
        const product = await prisma.product.findUnique({
            where: {
                productId: productId,
            },
        });
        if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });
        return NextResponse.json({ product }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}
//Delete product
export async function DELETE(request: NextRequest, context: { params: Promise<{ productId: string }> }) {

    const resolvedParams = await context.params;
    const { productId } = resolvedParams

    try {
        const product = await prisma.product.delete({
            where: {
                productId: productId,
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
export async function PUT(request: NextRequest, context: { params: Promise<{ productId: string }> }) {

    const resolvedParams = await context.params;
    const { productId } = resolvedParams

    const formData = await request.formData();
    const productName = formData.get("name") as string;
    const productDescription = formData.get("description") as string;
    const productStock = Number(formData.get("stock"));
    const productPrice = Number(formData.get("price"));
    const productImage = formData.get("image") as File;
    console.log("product name", productName)

    const product = await prisma.product.findUnique({
        where: {
            productId: productId,
        },
    });
    if (!product) return NextResponse.json({ error: 'product not found' }, { status: 404 });

    console.log("Producto a modificar", product)

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

        const dataToUpdate: Partial<{ name: string; image: string; description: string; price: number; stock: number }> = {}

        if (productName) dataToUpdate.name = productName.toString()
        if (imageUrl) dataToUpdate.image = imageUrl
        if (productDescription) dataToUpdate.description = productDescription.toString()
        if (productPrice !== undefined) dataToUpdate.price = productPrice
        if (productStock !== undefined) dataToUpdate.stock = productStock

        const updatedProduct = await prisma.product.update({
            where: {
                productId: product.productId,
            },
            data: dataToUpdate,
        })
        console.log("producto modificado:", updatedProduct)
        return NextResponse.json({ product: updatedProduct }, { status: 200 });
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}