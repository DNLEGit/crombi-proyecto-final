"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/card";
import { Product } from "@prisma/client";
import { useParams } from "next/navigation";

export default function ClientCategoryPage({ params }: { params: { categoryId: string } }) {
    console.log(params)
    const [categoryProducts, setCategoryProducts] = useState([]);
    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const response = await fetch(`/api/categories/${params.categoryId}`);
                if (!response.ok) throw new Error("Failed to fetch category products");
                const data = await response.json();
                setCategoryProducts(data.categoryProducts);
                console.log(data.categoryProducts);
            } catch (error) {
                console.error("Error fetching category products:", error);
            }
        };

        fetchCategoryProducts();
    }, [params.categoryId]);

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-950 text-white">
            <h1 className="text-4xl font-bold mb-6">{ } Category Page</h1>
            <div className="bg-gray-950 flex flex-row gap-2">
                {categoryProducts.map((product: Product) => (
                    <Card key={product.productId} {...product} />
                ))}
            </div>
        </div>
    );
}
