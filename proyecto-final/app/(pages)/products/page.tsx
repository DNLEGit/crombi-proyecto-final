/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Card from "@/components/card";
import { useState, useEffect } from "react";

export default function Product() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState<Array<{ categoryId: string; name: string }>>([]);
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        fetch("/api/categories")
            .then((res) => res.json())            
            .then((data) => {
                console.log("categories fetched",data.categories);
                setCategories(data.categories);
            });

    }, []);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", categoryId)
        if (image) formData.append("image", image);

        const res = await fetch("/api/product", {
            method: "POST",
            body: formData,
        });
        console.log(res);
        if (res.ok) {
            alert("Producto creado!");
            setName("");
            setDescription("");
            setPrice("");
            setCategoryId("");
            setImage(null);
        }
      
    };

    return (
        <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">Admin - Crear Producto</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-96">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Nombre</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded text-black"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Descripción</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded text-black"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Precio</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-2 border rounded text-black"
                        required
                    />
                </div>
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} required />
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Categoría</label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full p-2 border rounded text-black"
                        required
                    >
                        <option value="" disabled>Selecciona una categoría</option>
                        {categories.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
                    Crear Producto
                </button>
            </form>
            <div>
                <Card/>
            </div>
        </main>
    );
}

// make the categories for the seeds so i can test the gcloud bucket i created last week
// finish setting the prisma orm so i can merge the branch with dev before tomorro if posible
// next step is the user auth and setting the routes each kind of user can accses.

