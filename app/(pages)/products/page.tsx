import ProductsList from "@/components/product-list";
import { Suspense } from "react";


export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="text-white p-4">Loading products...</div>}>
            <ProductsList />
        </Suspense>
    );
}