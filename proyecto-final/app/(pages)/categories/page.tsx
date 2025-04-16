"use client";

import CategoryCard from "@/components/category-card";
import { useEffect, useState } from "react";
import { Category } from "@prisma/client";


export default function CategoriesPage() {

    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {

        //fetches the categories and then assing the value to categories
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
    }, [])

    return (
        <div>
            <div>
                <img
                    src="https://storage.googleapis.com/bucket-videoar/e3a68822-656a-4ae3-afca-ddabc48d3928.png"
                    alt="Background"
                    className="absolute top-0 left-0 w-full h-full object-cover -z-10"
                />
            </div>

            <div className="min-h-screen flex items-center justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">

                    {categories.map(category => (
                        <CategoryCard

                            key={category.categoryId}
                            category={category}
                        />
                    )
                    )}
                </div>
            </div>
        </div>
    );
}