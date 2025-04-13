"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ productId }: { productId: string }) {
    const router = useRouter();

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault(); // Previene que Link redireccione
        router.push("/products");
        try {
            const res = await fetch(`/api/product/${productId}`, {
                method: "DELETE",
            });
            console.log("resultado del delete", res)
            if (!res.ok) throw new Error("Failed to delete product");

            router.refresh(); // Refresca la lista si estás en app router
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 z-10"
        >
            DELETE
        </button>
    );
}
