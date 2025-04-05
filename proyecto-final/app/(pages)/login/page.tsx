"use client"
import { loginAction } from "@/app/actions/auth";
import { useActionState } from "react";


export default function Login(){

    const [formState, action] = useActionState(loginAction, undefined)


    return (
        <div>
            <div>
                <h1>User Page</h1>
            </div>          
            <form action= {action}>
                <div>
                     <div className="max-w-md mx-auto relative overflow-hidden z-10 bg-gray-900 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-purple-600 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
                        <h2 className="text-2xl font-bold text-white mb-6">Create Your Profile</h2>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-300" htmlFor="email">
                                            Email Address
                                        </label>
                                        <input
                                            className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                                            type="email"                                    
                                            name= "email"
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
                                    <div className="flex justify-end">
                                        <button
                                            className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-800 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                                            type="submit">
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