/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Link from 'next/link';
import { useEffect, useState } from "react"
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { logoutAction } from '@/app/actions/logout';



const NavBar: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState("");
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
            const res = await fetch("/api/auth/user", { cache: "no-store", credentials: "include" });
            const data = await res.json();
            setIsAuthenticated(data.isAuthenticated)
            setRole(data.user?.role || "")
        }
        checkAuth();
    }, [pathname])

    const handleLogout = async (): Promise<void> => {
        await logoutAction();

        router.refresh();
        router.push("/login")
    };

    return (
        <div className='flex justify-between items-center p-4 bg-gradient-to-tr from-purple-600 via-black to-purple-900 h-26 text-white '>

            {/* Botón Home a la izquierda */}
            <div className='flex items-center font-Arial duration-500 hover:scale-115'>
                <Link href={'/'} className='mr-4 flex items-center'>
                    <svg
                        preserveAspectRatio="xMidYMid meet"
                        data-bbox="17 17.002 166.002 165.999"
                        viewBox="17 17.002 166.002 165.999"
                        height="46"
                        width="46"
                        xmlns="http://www.w3.org/2000/svg"
                        data-type="color"
                        role="img"
                        aria-label="Página de inicio"
                    >
                        <g>
                            <path
                                d="M54.331 87.495c4.406-16.714 17.655-29.828 34.401-34.112 29.968-7.668 57.117 12.228 61.475 39.711.552 3.483 2.105 6.729 4.599 9.223l19.149 19.149c2.211 2.211 5.988 1.144 6.723-1.894 3.668-15.163 3.177-31.948-2.79-49.095-8.087-23.242-26.742-41.364-50.144-48.976C60.747-.296-.254 60.667 21.471 127.658c7.58 23.373 25.64 42.024 48.826 50.158 17.08 5.991 33.797 6.533 48.916 2.945 3.048-.723 4.124-4.511 1.909-6.726l-20.582-20.582c-2.285-2.285-5.217-3.788-8.388-4.413-26.668-5.25-45.59-32.077-37.821-61.545z"
                                fill="#FFFFFF"
                                data-color="1"
                            ></path>
                            <path
                                d="M150.451 126.185a44.142 44.142 0 0 1-24.881 24.3c-3.495 1.347-4.473 5.821-1.824 8.469l21.968 21.968a7.092 7.092 0 0 0 5.014 2.077h26.29a5.56 5.56 0 0 0 5.559-5.559v-26.29a7.09 7.09 0 0 0-2.077-5.014L158.864 124.5c-2.603-2.601-7.009-1.717-8.413 1.685z"
                                fill="#FFFFFF"
                                data-color="1"
                            ></path>
                            <path
                                fill="#FFFFFF"
                                d="M126.255 100.847c0 13.565-10.996 24.561-24.561 24.561s-24.561-10.996-24.561-24.561 10.996-24.561 24.561-24.561 24.561 10.996 24.561 24.561z"
                                data-color="1"
                            ></path>
                        </g>
                    </svg>
                    <span className="text-[22px] p-2 font-bold ">VIDEOAR</span>
                </Link>
            </div>


            {/* Botones de categorías y productos centrados */}
            {/* Botón User a la derecha */}
            <div className='flex justify-end font-extralight'>
                <div className='flex justify-between items-center'>
                    <div className='m-2 hover:text-[#8858ed] text-[16px]'>
                        <Link href={'/categories'}> Categories </Link>
                    </div>
                    <div className='m-2 hover:text-[#8858ed] text-[16px]'>
                        <Link href={'/products'}> Products </Link>
                    </div>

                    {role === "ADMIN" ? (
                        <>
                            <div className='m-2 hover:text-[#8858ed] text-[16px]'>
                                <Link href={'/admin'}>Admin Panel</Link>
                            </div>

                        </>
                    ) : null}

                    {isAuthenticated ? (

                        <>

                            <div className='m-2 hover:text-[#8858ed] text-[16px]'>
                                <Link href={'/user'}>User</Link>
                            </div>
                            <div>
                                <div className='m-2 hover:text-[#8858ed]'>
                                    <button onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>
                            </div>

                            <div className='flex justify-center items-center max-w-full'>
                                {/* Icono del carrito */}
                                <div className='m-2 hover:text-[#8858ed]'>
                                    <Link href={'/cart'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='m-2 hover:text-[#8858ed] text-[16px]'><Link href="/login">Login</Link></div>

                    )}

                </div>



            </div>
        </div>
    );
};

export default NavBar;



function checkAuth() {
    throw new Error('Function not implemented.');
}
// Removed conflicting local useState function
//todo- ponerle un icono al carrito
//poner icono de usuario
