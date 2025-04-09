/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";

export default function Admin() {
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
                console.log("categories fetched", data.categories);
                setCategories(data.categories);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", categoryId);
        if (image) formData.append("image", image);

        const res = await fetch("/api/product", {
            method: "POST",
            body: formData,
        });

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
        <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold text-purple-400 mb-8">Crear Producto</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-gray-900 shadow-md rounded-lg p-8 w-full max-w-lg relative overflow-hidden before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-purple-600 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
            >
                <div className="mb-4">
                    <label className="block text-gray-300 font-medium mb-2">Nombre</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-300 font-medium mb-2">Descripción</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-300 font-medium mb-2">Precio</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-300 font-medium mb-2">Imagen</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        required
                        className="w-full p-2 bg-gray-800 text-white rounded border border-gray-600 file:bg-purple-600 file:border-none file:px-4 file:py-2 file:rounded file:text-white file:cursor-pointer file:transition hover:file:opacity-80"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-300 font-medium mb-2">Categoría</label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
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

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-800 text-white px-4 py-2 font-bold rounded-md hover:opacity-80 transition"
                >
                    Crear Producto
                </button>
            </form>
        </main>
    );
}
