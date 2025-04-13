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
        <div className="grid grid-cols-4 gap-6 bg-gray-950 p-2">
            {categories.map(category => (
                <CategoryCard
                    key={category.categoryId}
                    category={category}
                />
            )
            )}
        </div>
    );
}