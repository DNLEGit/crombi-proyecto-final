
"use server"
import { LoginFormSchema, FormState } from '@/lib/definitions'
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
 
export async function loginAction(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const parsed = LoginFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
       
    });
    console.log(parsed.data?.password);
    if(!parsed.success){
        return { errors: parsed.error.flatten().fieldErrors };
    }
    const { email, password} = parsed.data;

    const user = await prisma.user.findUnique({ where : {email}})

    if(!user){
        return { message: `Failed to find a user with the email: ${email}` }
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
        return { message: "The password provided is incorrect"};
    }
    
    const role = user.role;
    const id = user.userId;
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    const token = jwt.sign({ email, role, id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    ( await cookies()).set("token", token, { httpOnly: true, secure: true})

    redirect("/")

}