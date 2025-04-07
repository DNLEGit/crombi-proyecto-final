/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const storage = new Storage();
const BUCKET_NAME = "bucket-videoar";


export async function GET(){
    const products = await prisma.product.findMany();
    console.log(products);
    return NextResponse.json({products}, {status: 200});
}

export async function POST(req: NextRequest) {
    try{
    //tries to get the fields 
    const formData = await req.formData();
    console.log("From data: ", formData)
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseInt(formData.get("price") as string, 10);
    const categoryId = formData.get("category") as string;
    const image = formData.get("image") as File | null;
    //if any of the fields is missing it interrupsts the creation and return the issue
    if (!name || !description || !price || !image) {
        return NextResponse.json(
            { message: "Every field is required." },
            { status: 400 }
        );
    }
    //sets the name of the file, connects to the bucket and saves the img in it 
    const fileName = `${uuidv4()}${path.extname(image.name)}`;
    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(fileName);
    const buffer = await image.arrayBuffer();
    await file.save(Buffer.from(buffer), {
        metadata: { contentType: image.type },
        public: true,
    });
    // assings the name of the img as its url
    const imageUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${fileName}`;

    // Saves the product on the db
    const product = await prisma.product.create({
        data: { name, description, price, categoryId, image: imageUrl },
    });

    return NextResponse.json(
        { message: "Product created", product },
        { status: 201 }
    );
}catch (error) {
   
    return NextResponse.json(
        {
            message: "Error creating the product:",
            error: (error as Error)?.message || error,
        },
        { status: 500 }
    );
}
}

//correct the bucke-name, i have to import it from the .env file not directly from here
