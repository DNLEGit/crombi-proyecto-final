/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest){
    const formData= await req.formData();
    console.log(formData);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const hashedPassword = formData.get("password") as string;

    const userExist = await prisma.user.findUnique({
        where: { email },
    });

    if(userExist){
        return NextResponse.json(
            {message : "The email is already used"},
            {status: 404}
        )
    }

    if(!name || !email || !hashedPassword){
        return NextResponse.json(
            {message: "Every field is required"},
            {status: 400}
        )
    }
    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword}
    });
    return NextResponse.json(
        {message: "User created", user},
        {status: 201}
    )
    
}