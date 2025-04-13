import { Product } from "@prisma/client";



export default function ProductDescription({ product }: { product: Product }) {

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Product ID: {product.productId}</p>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <button className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-800 text-white px-4 py-2 font-bold rounded-md hover:opacity-80">
                Add to Cart</button>
        </div>
    )
}