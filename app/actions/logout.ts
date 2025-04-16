"use server"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";



export async function logoutAction() {
    (await cookies()).set("token", "", { expires: new Date(0) });
    revalidatePath("/");
}
