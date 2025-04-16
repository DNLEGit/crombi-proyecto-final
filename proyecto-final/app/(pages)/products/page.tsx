/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Card from "@/components/card";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const PAGE_SIZE = 10;

export default function Products() {
    const [role, setRole] = useState("");

    useEffect(() => {
        async function checkAuth() {
            const res = await fetch("/api/auth/user", { cache: "no-store" });
            const data = await res.json();
            setRole(data.user?.role || "");
        }
        checkAuth();
    }, []);

    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");

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

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        const params = new URLSearchParams(searchParams.toString());
        params.set("search", value);
        params.set("page", "1");
        router.replace(`${pathname}?${params.toString()}`);
    };

    const totalPages = Math.ceil(total / PAGE_SIZE);

    return (
        <div>
            {/* Background Image */}
            <img
                src="https://storage.googleapis.com/bucket-videoar/b0f4566a-acae-4672-8c66-e36661509207.png"
                alt="Background"
                className="absolute bot-0 left-0 w-full h-full object-cover -z-10"
            />

            {/* Search Input */}
            <input
                className="w-[90%] mx-auto block p-2 mb-4 rounded-lg text-white bg-white/10 backdrop-blur-md placeholder-white m-2"
                type="text"
                placeholder="Search products"
                value={search}
                onChange={handleSearch}
            />

            {/* Product Cards */}
            <div className="grid grid-cols-5 gap-6 p-2">
                {products.map((product: Product) => (
                    <Card role={role} key={product.productId} {...product} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-2 my-6 bg-transparent">
                {/* Previous Button */}
                <button
                    disabled={page <= 1}
                    onClick={() => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.set("page", (page - 1).toString());
                        router.push(`${pathname}?${params.toString()}`);
                    }}
                    className={`px-4 py-2 rounded-md transition-all ${page <= 1
                        ? "bg-transparent text-gray-400 cursor-not-allowed"
                        : "bg-white/10 text-white hover:bg-white/20 backdrop-blur"
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
                            className={`px-4 py-2 rounded-md transition-all ${i + 1 === page
                                ? "bg-purple-600 text-white"
                                : "bg-white/10 text-white hover:bg-white/20 backdrop-blur"
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
                    className={`px-4 py-2 rounded-md transition-all ${page >= totalPages
                        ? "bg-transparent text-gray-400 cursor-not-allowed"
                        : "bg-white/10 text-white hover:bg-white/20 backdrop-blur"
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
