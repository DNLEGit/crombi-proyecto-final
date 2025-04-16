"use client"
import React, { useEffect, useState } from 'react';
import ProductDescription from '@/components/product-description';
import { useParams } from 'next/navigation';
import { Product } from '@prisma/client';

const ProductPage = () => {
    const params = useParams();
    const [produtcToDisplay, setProductToDisplay] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/categories/${params.categoryId}/${params.productId}`);
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
        <div>
            <div>
                <img
                    src="https://storage.googleapis.com/bucket-videoar/b0f4566a-acae-4672-8c66-e36661509207.png"
                    alt="Background"
                    className="absolute bot-0 left-0 w-full h-full object-cover -z-10"
                />
            </div>
            {produtcToDisplay && <ProductDescription product={produtcToDisplay} />}
        </div>
    );
};

export default ProductPage;