
import Image from "next/image";
import Link from "next/link";

interface Category {
    categoryId: string;
    categoryImageUrl: string;
    name: string;
}

export default function CategoryCard({ category }: { category: Category }) {
    return (
        <div
            className="relative w-64 h-80 overflow-hidden rounded-2xl drop-shadow-xl transition-transform duration-300 hover:scale-105 group"
            style={{ position: 'relative', overflowY: 'hidden' }}
        >
            {/* Image Wrapper */}
            <div className="w-full h-60 flex-grow overflow-hidden rounded-2xl">
                <Image
                    src={category.categoryImageUrl}
                    alt={category.categoryImageUrl}
                    layout="fill"
                    objectFit="contain"
                />
            </div>

            {/* Dark Overlay on Hover */}
            <div className="absolute inset-0 bg-blue bg-opacity-50 z-10 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

            {/* Hover Info (shows on hover) */}
            <div className="absolute inset-0 flex items-center justify-center text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link
                    href={`/categories/${category.categoryId}`}
                    className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                    Explore
                </Link>
            </div>

            {/* Bottom Info (always visible) */}
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-60 text-white text-center py-2 z-30">
                <div className="text-lg  font-bold truncate px-2">{category.name}</div>
            </div>
        </div>
    );
}
