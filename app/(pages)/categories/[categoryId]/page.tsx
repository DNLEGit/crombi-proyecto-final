"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/card";
import { Product } from "@prisma/client";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ClientCategoryPage() {
    const { categoryId } = useParams() as { categoryId: string }; // ⬅️ Strong typing
    const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const response = await fetch(`/api/categories/${categoryId}`);
                if (!response.ok) throw new Error("Failed to fetch category products");

                const data = await response.json();
                setCategoryProducts(data.categoryProducts); // ⬅️ Make sure your API returns this key                
            } catch (error) {
                console.error("Error fetching category products:", error);
            }
        };

        if (categoryId) {
            fetchCategoryProducts();
        }
    }, [categoryId]);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen w-screen bg-translucid text-white py-8 px-4">
            <Image
                src="https://storage.googleapis.com/bucket-videoar/b0f4566a-acae-4672-8c66-e36661509207.png"
                fill
                style={{ objectFit: "cover" }}
                objectFit="cover"
                className="absolute bot-0 left-0 -z-10" alt={""}
            />
            <div className="flex flex-wrap  justify-center gap-4">
                {categoryProducts.map((product: Product) => (
                    <Card key={product.productId} {...product} role={"CLIENT"} />
                ))}
            </div>
        </div>
    );
}
