/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Card from "@/components/card";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const PAGE_SIZE = 10;

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");

    // Fetch products based on current search and page
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    `/api/product?search=${search}&page=${page}`
                );
                if (!response.ok) throw new Error("Failed to fetch products");
                const data = await response.json();
                setProducts(data.products);
                setTotal(data.total);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [search, page]);

    // Handle search input and update URL params
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        const params = new URLSearchParams(searchParams.toString());
        params.set("search", value);
        params.set("page", "1"); // Reset to first page when searching
        router.replace(`${pathname}?${params.toString()}`);
    };

    const totalPages = Math.ceil(total / PAGE_SIZE);

    return (
        <div>
            <input
                className="w-[90%] mx-auto block p-2 mb-4 rounded-lg bg-gray-800 text-white m-2"
                type="text"
                placeholder="Search products"
                value={search}
                onChange={handleSearch}
            />

            <div className="grid grid-cols-5 gap-6 bg-gray-950 p-2">
                {products.map((product: Product) => (
                    <Card key={product.productId} {...product} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-2 my-6">
                {/* Previous Button */}
                <button
                    disabled={page <= 1}
                    onClick={() => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.set("page", (page - 1).toString());
                        router.push(`${pathname}?${params.toString()}`);
                    }}
                    className={`px-4 py-2 rounded-md ${page <= 1
                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                            : "bg-gray-800 text-white hover:bg-gray-700"
                        }`}
                >
                    Previous
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("page", (i + 1).toString());

                    return (
                        <a
                            key={i}
                            href={`${pathname}?${params.toString()}`}
                            className={`px-4 py-2 rounded-md ${i + 1 === page
                                    ? "bg-purple-600 text-white"
                                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                }`}
                        >
                            {i + 1}
                        </a>
                    );
                })}

                {/* Next Button */}
                <button
                    disabled={page >= totalPages}
                    onClick={() => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.set("page", (page + 1).toString());
                        router.push(`${pathname}?${params.toString()}`);
                    }}
                    className={`px-4 py-2 rounded-md ${page >= totalPages
                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                            : "bg-gray-800 text-white hover:bg-gray-700"
                        }`}
                >
                    Next
                </button>
            </div>

        </div>
    );
}
