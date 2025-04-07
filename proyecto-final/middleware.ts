import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/user", "/admin"];

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const isProtectedRoute = PROTECTED_ROUTES.includes(req.nextUrl.pathname);

    // if (req.nextUrl.pathname === "/admin") {
    //     const userRole = req.cookies.get("role")?.value;
    //     if (userRole !== "ADMIN") {
    //         return NextResponse.redirect(new URL("/not-authorized", req.url));
    //     }
    // }

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/user", "/admin"],
};