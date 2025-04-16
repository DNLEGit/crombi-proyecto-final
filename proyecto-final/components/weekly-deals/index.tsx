// components/WeeklyDeals.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function WeeklyDeals() {
    return (
        <section className="bg-translucid py-16 rounded-2xl relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="w-full h-[519px] relative">
                        <Image
                            src="https://storage.googleapis.com/bucket-videoar/ab2cb5d9-787a-47b4-afff-c4dc1008ed26.jpg"
                            alt="Kira"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    </div>
                    <div className="w-full h-[523px] relative">
                        <Image
                            src="https://storage.googleapis.com/bucket-videoar/6b3cbac7-58aa-4b74-87e5-b9382a638c3c.jpg"
                            alt="Dead at Last"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    </div>
                    <div className="w-full h-[523px] relative">
                        <Image
                            src="https://storage.googleapis.com/bucket-videoar/c9329eb6-023a-49e0-ba4e-58eb2b0a0df1.jpg"
                            alt="Chronosplit"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    </div>
                </div>

                {/* Sección que se superpone a las imágenes */}
                <div className="absolute top-[75%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 text-center bg-[#8858ed] p-8 rounded-2xl z-10">
                    <h2 className="text-xl font-semibold text-white">THIS WEEK'S DEALS</h2>
                    <p className="text-[140px] leading-none font-bold text-white">10%</p>
                    <p className="text-3xl text-white">off all FromSoftware games</p>
                    <Link href="/products">
                        <p className="inline-block px-8 py-3 mt-4 bg-white text-[#8858ed] rounded-lg border-t-2 border-b-2 border-l border-r border-[#8858ed] hover:bg-[#8858ed] hover:text-white hover:border-white transition">
                            Shop Now
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    );
}
