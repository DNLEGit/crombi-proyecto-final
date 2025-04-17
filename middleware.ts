import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const PROTECTED_ROUTES = ["/user", "/admin"];
export const config = {
    runtime: 'nodejs',
    matcher: ["/user", "/admin"],
};


export function middleware(req: NextRequest) {
    const token = req.cookies.get("token") ? req.cookies.get("token")?.value : null;
    if (!token) {
        return NextResponse.json({ message: "no sesion available", error: 404 })
    }
    const isProtectedRoute = PROTECTED_ROUTES.includes(req.nextUrl.pathname);
    //para ver si es admin o no y boquear o no la ruta a admin

    if (req.nextUrl.pathname === "/admin") {
        //DUDAS
        // console.log(req.cookies)
        // const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { role: String }
        //  esto esta importando algo ?por que si funciona en otras partes de l codigo ?

        const decodedToken = "ADMIN"
        const userRole = decodedToken;
        if (userRole !== "ADMIN") {
            return NextResponse.redirect(new URL("/not-authorized", req.url));
        }
    }

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
};
// Removed duplicate config declaration  matcher: ["/user", "/admin"],
