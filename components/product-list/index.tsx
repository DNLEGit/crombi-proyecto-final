
"use client";

import Card from "@/components/card";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const PAGE_SIZE = 10;

export default function ProductsList() {
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
            <Image
                src="https://storage.googleapis.com/bucket-videoar/b0f4566a-acae-4672-8c66-e36661509207.png"
                alt="Background"
                layout="fill"
                objectFit="cover"
                className="-z-10 blur-sm"
                priority
            />
            <input
                className="w-[90%] mx-auto block p-2 mb-4 rounded-lg text-white bg-white/10 backdrop-blur-md placeholder-white m-2"
                type="text"
                placeholder="Search products"
                value={search}
                onChange={handleSearch}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6 mb-20">
                {products.map((product: Product) => (
                    <Card role={role} key={product.productId} {...product} />
                ))}
            </div>
            <div className="fixed bottom-0 left-0 w-full flex justify-center items-center gap-2 bg-black/40 backdrop-blur-md py-4 z-50">
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
