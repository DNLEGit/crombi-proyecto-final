/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { Storage } from '@google-cloud/storage';


const storage = new Storage();
const BUCKET_NAME = 'bucket-videoar';

export async function GET(req: NextRequest) {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
        return NextResponse.json({ isAuthenticated: false, role: null });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
        const user = await prisma.user.findUnique({
            where: { email: decodedToken.email }
        });

        if (!user) {
            return NextResponse.json({ isAuthenticated: false, role: null });
        }

        return NextResponse.json({ isAuthenticated: true, user: user });
    } catch (error) {
        return NextResponse.json({ isAuthenticated: false, role: null });
    }
}

export async function POST(req: NextRequest) {

    const imageUrl = "https://storage.googleapis.com/bucket-videoar/cca86d9c-77a6-4b0d-850f-c217d68d3d2d-1744215630895.jpg";
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const hashedPassword = formData.get("password") as string;

    const userExist = await prisma.user.findUnique({
        where: { email },
    });

    if (userExist) {
        return NextResponse.json(
            { message: "The email is already used" },
            { status: 404 }
        )
    }

    if (!name || !email || !hashedPassword) {
        return NextResponse.json(
            { message: "Every field is required" },
            { status: 400 }
        )
    }
    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword, imageUrl: imageUrl },
    });
    return NextResponse.json(
        { message: "User created", user },
        { status: 201 }
    )

}

export async function PUT(request: NextRequest) {
    const token = (await cookies()).get("token")?.value;
    console.log(token)
    const formData = await request.formData();
    const userImage = formData.get("image") as File;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    console.log("FormData Data: ", name, password, userImage)

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };

    const user = await prisma.user.findUnique({
        where: { email: decodedToken.email },
    });
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log("User: ", user)


    if (userImage) {
        const arrayBuffer = await userImage?.arrayBuffer(); // 👈 Ensure userImage is a File or Blob
        const buffer = Buffer.from(arrayBuffer);
        const fileName = `${user.userId}-${Date.now()}.jpg`; // Generate a unique file name
        const file = storage.bucket(BUCKET_NAME).file(fileName);
        await file.save(Buffer.from(buffer), {
            metadata: { contentType: 'image/jpeg' }, // Adjust content type if needed
            public: true,
        });
        const imageUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${fileName}`;
    }

    const updatedUser = await prisma.user.update({
        where: { userId: user.userId },
        data: {
            name: name || user.name,
            imageUrl: user.imageUrl,
            password: password || user.password,
        },
    });

    return NextResponse.json(updatedUser);
}
