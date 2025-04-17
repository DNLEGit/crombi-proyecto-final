/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState } from 'react'
import Image from 'next/image'
import { hash } from 'bcryptjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



export default function UserPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        const hashedPassword = await hash(password, 10);
        formData.append("password", hashedPassword);

        console.log(formData.get("name"));

        const res = await fetch("/api/auth/user/", {
            method: "POST",
            body: formData,
        });

        console.log(res);
        if (res.ok) {
            alert("User created");
            setName("");
            setEmail("");
            setPassword("");
            router.push("/login");
        }

    }
    return (
        <><div>
            <Image
                src="https://storage.googleapis.com/bucket-videoar/8fe51696-2dc9-494e-b196-e57fd4d596f8.jpg"
                alt="Background"
                layout="fill"
                objectFit="cover"
                className="absolute top-0 left-0 -z-10 blur-sm" />
        </div><form onSubmit={handleSubmit}>
                <div>
                    <div className="max-w-md mx-auto relative overflow-hidden z-10 bg-gray-900 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-purple-600 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
                        <h2 className="text-2xl font-bold text-white mb-6">Create Your Profile</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300" htmlFor="password"
                            >Password</label>
                            <input
                                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-800 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                            >
                                Register

                            </button>
                        </div>

                    </div>

                </div>
            </form></>

    );
}