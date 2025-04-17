"use client"

import { hash } from 'bcryptjs';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


const UserUpdatePage = () => {
    // State variables to hold user input
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState<File | null>(null);


    const router = useRouter();

    // Function to handle form submission
    // It prevents the default form submission behavior, creates a FormData object, and appends the user input to it.
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        const hashedPassword = await hash(password, 10);
        formData.append("password", hashedPassword);
        if (imageUrl) {
            formData.append("image", imageUrl);
        }

        console.log("FormData: ", formData.get("name"), formData.get("password"), formData.get("image"));
        const res = await fetch("/api/auth/user", {
            method: "PUT",
            body: formData,
        });
        // //debugging the response
        // console.log("response: ", res);

        // Check if the response is ok (status code 200-299)
        // If the response is ok, alert the user and redirect to the user page
        if (res.ok) {
            alert("Profile Updated");
            setName("");
            setPassword("");
            setImageUrl(null);
            router.push("/user");
        }

    }



    return (
        <div className="user-update-page">



            <div className="max-w-md mx-auto relative overflow-hidden z-10 bg-gray-900 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-purple-600 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
                <h2 className="text-2xl font-bold text-white mb-6">Update Your Profile</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            className="mt-1 p-2 w-full bg-gray-700 
                        border border-gray-600 rounded-md text-white"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}

                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 font-medium mb-2">Imagen</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageUrl(e.target.files?.[0] || null)}
                            required
                            className="w-full p-2 bg-gray-800 text-white rounded border border-gray-600 file:bg-purple-600 file:border-none file:px-4 file:py-2 file:rounded file:text-white file:cursor-pointer file:transition hover:file:opacity-80"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-800 text-white px-4 py-2 font-bold rounded-md hover:opacity-80 transition duration-300"
                        >
                            Update!
                        </button>

                    </div>
                </form>
            </div>

        </div >
    );
};

export default UserUpdatePage;