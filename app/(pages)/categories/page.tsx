"use client";

import CategoryCard from "@/components/category-card";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Category } from "@prisma/client";

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`/api/categories`);
                if (!response.ok) throw new Error("Failed to fetch categories");
                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <>
            <div>
                <Image
                    src="https://storage.googleapis.com/bucket-videoar/e3a68822-656a-4ae3-afca-ddabc48d3928.png"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    className="-z-10 blur-sm"
                />
            </div>
            <div className="min-h-screen flex items-center justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
                    {categories.length > 0 ? (
                        categories.map((category: Category) => (
                            <CategoryCard
                                key={category.categoryId}
                                category={category}
                            />
                        ))
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center min-h-screen z-20">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
