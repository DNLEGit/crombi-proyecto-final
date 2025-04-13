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
            {produtcToDisplay && <ProductDescription product={produtcToDisplay} />}
        </div>
    );
};

export default ProductPage;