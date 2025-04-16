import { Product } from "@prisma/client";

/* eslint-disable @next/next/no-img-element */
export default function ProductDescription({ product }: { product: Product }) {
    return (
        <div className="min-h-screen w-full flex justify-center items-center  p-6">
            <div className="max-w-4xl w-full bg-[#323132] text-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="w-full md:w-1/2 h-80 bg-[#3d3c3d] rounded-xl flex justify-center items-center overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                    />
                </div>

                {/* Details */}
                <div className="w-full md:w-1/2 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        <p className="text-sm text-gray-300 mb-2">
                            <span className="font-semibold text-white">Product ID:</span> {product.productId}
                        </p>
                        <p className="text-base text-gray-200 mb-4">{product.description}</p>
                        <p className="text-lg font-semibold text-purple-300 mb-4">${product.price.toFixed(2)}</p>
                        <p>Stock: {product.stock}</p>
                    </div>

                    <button className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-800 text-white px-6 py-3 font-bold rounded-md hover:opacity-80 mt-4 w-full">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
