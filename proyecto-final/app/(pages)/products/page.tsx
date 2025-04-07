/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Card from "@/components/card";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Products() {
    
const [products, setProducts] = useState([]) 

useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await fetch("/api/product");
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            console.log(data.products)
            setProducts(data.products);

        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    fetchProducts();
}, []);
    

    return (
        
            <div className="bg-gray-950 p-2">
                {products.map((product: Product) => (
                    <Card 
                        key={product.productId} 
                        {...product} 
                    />
                ))}
            </div>
    
    );
}



//style the cards
//make the pagination
//make the delete button for the admin user
//make the search 
//

