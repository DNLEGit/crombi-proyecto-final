/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const storage = new Storage();
const BUCKET_NAME = "bucket-videoar";


export async function GET(){
    const products = await prisma.product.findMany();
    return NextResponse.json({products}, {status: 200})
}

export async function POST(req: Request) {
    try{
    const formData = await req.formData();
    console.log("From data: ", formData)
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseInt(formData.get("price") as string, 10);
    const categoryId = formData.get("category") as string;
    const image = formData.get("image") as File | null;

    if (!name || !description || !price || !image) {
        return NextResponse.json(
            { message: "Todos los campos son obligatorios." },
            { status: 400 }
        );
    }

    const fileName = `${uuidv4()}${path.extname(image.name)}`;
    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(fileName);
    const buffer = await image.arrayBuffer();
    await file.save(Buffer.from(buffer), {
        metadata: { contentType: image.type },
        public: true,
    });

    const imageUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${fileName}`;

    // 🔹 Guardar el producto en la base de datos
    const product = await prisma.product.create({
        data: { name, description, price, categoryId, image: imageUrl },
    });

    return NextResponse.json(
        { message: "Producto creado", product },
        { status: 201 }
    );
}catch (error) {
    console.error("Error al crear el producto:", error);
    return NextResponse.json(
        {
            message: "Error al crear el producto",
            error: (error as Error)?.message || error,
        },
        { status: 500 }
    );
}
}