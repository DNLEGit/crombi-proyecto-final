import { Category } from "@prisma/client";
import Image from "next/image";




export default function CategoryCard({ category }: { category: Category }) {
    return (
        <div className="drop-shadow-xl w-64 h-80 
            overflow-hidden rounded-2xl bg-gradient-to-r 
            from-slate-500 to-slate-800 flex flex-col 
            justify-between p-4
            transition-transform duration-300 hover:scale-105">
            <div>
                {/* Top - Image */}
                <div className="flex justify-center items-center">
                    <div className="relative">
                        <Image
                            src={category.categoryImageUrl}
                            alt={category.name}
                            width={160}
                            height={160}
                            className="rounded-full mx-auto"
                            priority
                        />
                    </div>
                </div>
            </div>

            <div className=''>
                {/* Middle - Info */}
                <div className="text-white text-center mt-4">
                    <div className="text-lg font-bold truncate">{category.name}</div>

                </div>

            </div>

        </div>


    );
}