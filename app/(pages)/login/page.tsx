"use client"
import { loginAction } from "@/app/actions/auth";
import Link from "next/link";
import { useActionState } from "react";
import Image from "next/image";


export default function Login() {

    const [formState, action] = useActionState(loginAction, undefined)


    return (
        <div >
            <div>

                <Image
                    src="https://storage.googleapis.com/bucket-videoar/e3a68822-656a-4ae3-afca-ddabc48d3928.png"
                    alt="Background"
                    fill
                    className="absolute top-0 left-0 object-cover -z-10"
                />
            </div>

            <form action={action}>
                <div>
                    <div className="max-w-md mx-auto relative overflow-hidden mt-5 z-10 bg-gray-900 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-purple-600 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
                        <h2 className="text-2xl font-bold text-white mb-6">Sing in</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                                type="email"
                                name="email"
                                required
                            />
                            {formState?.errors?.email && (
                                <p className="text-red-500 text-sm">{formState.errors.email[0]}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300" htmlFor="password"
                            >Password</label>
                            <input
                                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                                type="password"
                                name="password"
                                required
                            />
                            {formState?.errors?.password && (
                                <p className="text-red-500 text-sm">{formState.errors.password[0]}</p>
                            )}
                        </div>
                        <div className="flex justify-end gap-2">
                            <Link
                                href="/register"
                                className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-800 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                            >
                                Register
                            </Link>
                            <button
                                className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-800 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>

                    </div>

                </div>
                {formState?.message && (
                    <p className={`text-center text-sm mt-2 ${formState.message === "Login exitoso" ? "text-green-600" : "text-red-500"}`}>
                        {formState.message}
                    </p>
                )}
            </form>

        </div>
    )
}