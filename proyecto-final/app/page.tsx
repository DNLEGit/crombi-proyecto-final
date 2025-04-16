import WeeklyDeals from "@/components/weekly-deals";
import Image from "next/image";


export default function Home() {


  return (
    <><div className="relative w-full h-screen">
      {/* Background image */}
      <div>
        <Image
          src="https://storage.googleapis.com/bucket-videoar/e3a68822-656a-4ae3-afca-ddabc48d3928.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="-z-10" />
      </div>

      {/* Foreground image */}

      <WeeklyDeals />

    </div>
    </>

  );
}
