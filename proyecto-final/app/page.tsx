import WeeklyDeals from "@/components/weekly-deals";


export default function Home() {


  return (
    <div className="relative w-full h-screen">
      {/* Background image */}
      <div>
        <div>
          <img
            src="https://storage.googleapis.com/bucket-videoar/e3a68822-656a-4ae3-afca-ddabc48d3928.png"
            alt="Background"
            className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          />
        </div>

        {/* Foreground image */}

        <WeeklyDeals />

      </div>
      <div>


      </div>
    </div>

  );
}
