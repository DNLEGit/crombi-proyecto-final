
"use client";

import { useState, useEffect } from "react";

export default function Admin() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState<Array<{ categoryId: string; name: string }>>([]);
    const [image, setImage] = useState<File | null>(null);

    //fetches all the categories to display them when creating a new product
    useEffect(() => {
        fetch("/api/categories")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data.categories);
            });
    }, []);

    //method used to create a new product
    //it sends a post request to the api with the data of the new product
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("stock", stock)
        formData.append("category", categoryId);
        if (image) formData.append("image", image);

        const res = await fetch("/api/product", {
            method: "POST",
            body: formData,
        });
        //if everything its ok then it will alert the user that the product was created
        //and it will reset the form
        if (res.ok) {
            alert("Producto creado!");
            setName("");
            setDescription("");
            setPrice("");
            setStock("")
            setCategoryId("");
            setImage(null);
        }
        setLoading(false)
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
                    <label className="block text-gray-300 font-medium mb-2">Stock</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
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
                    disabled={loading}
                    className={`w-full px-4 py-2 font-bold rounded-md transition ${loading
                        ? "bg-gray-700 cursor-not-allowed text-gray-400"
                        : "bg-gradient-to-r from-purple-600 via-purple-400 to-purple-800 text-white hover:opacity-80"
                        }`}
                >
                    {loading ? "Creando..." : "Crear Producto"}
                </button>
            </form>



        </main>
    );
}
