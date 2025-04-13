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
            if (!params?.productId) return;
            try {
                const response = await fetch(`/api/products/${params.productId}`);
                if (!response.ok) throw new Error("Failed to fetch category products");
                const data = await response.json();
                if (!data) throw new Error("No data found for this product")
                setProductToDisplay(data.product);
                console.log(data.product);
            } catch (error) {
                console.error("Error fetching category products:", error);
            }
        };

        fetchProduct();
    }, [params.productId]);

    return (
        <div>
            {produtcToDisplay && <ProductDescription product={produtcToDisplay} />}
        </div>
    );
};

export default ProductPage;