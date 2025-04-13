"use client";

import CategoryCard from "@/components/category-card";
import { useEffect, useState } from "react";
import { Category } from "@prisma/client";


export default function CategoriesPage() {

    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
        // const items = [{ categoryId: "1", name: "Category 1", categoryImageUrl: "https://example.com/image.jpg" },
        // { categoryId: "2", name: "Category 2", categoryImageUrl: "https://example.com/image.jpg" },
        // { categoryId: "3", name: "Category 3", categoryImageUrl: "https://example.com/image.jpg" },
        // { categoryId: "4", name: "Category 4", categoryImageUrl: "https://example.com/image.jpg" }
        // ];

        const fetchCategories = async () => {
            try {
                const response = await fetch(`/api/categories`);
                if (!response.ok) throw new Error("Failed to fetch categories");
                const data = await response.json();
                setCategories(data.categories);
                console.log(data.categories);
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