"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ProductDescription from '@/components/product-description';
import { useParams } from 'next/navigation';
import { Product } from '@prisma/client';

const ProductPage = () => {
    const params = useParams();
    const [produtcToDisplay, setProductToDisplay] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/product/${params.productId}`);
                if (!res.ok) throw new Error("Failed to fetch product");
                const data = await res.json();
                setProductToDisplay(data.product);
            } catch (err) {
                console.error(err);
            }
        };

        if (params.categoryId && params.productId) fetchProduct();
    }, [params.categoryId, params.productId]);

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Fondo desenfocado */}
            <Image
                src="https://storage.googleapis.com/bucket-videoar/b0f4566a-acae-4672-8c66-e36661509207.png"
                alt="Background"
                fill
                className="object-cover blur-md -z-10"
            />
            {/* Componente encima */}
            <div className="relative z-10">
                {produtcToDisplay ? (
                    <ProductDescription product={produtcToDisplay} />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center min-h-screen z-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPage;
