import Image from "next/image";

export default function Home() {


  return (
    <div className="relative w-full h-screen">
      {/* Background image */}
      <div>
        <div>
          <img
            src="https://storage.googleapis.com/bucket-videoar/e3a68822-656a-4ae3-afca-ddabc48d3928.png"
            alt="Background"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        </div>

        {/* Foreground image */}
        <img
          src="https://storage.googleapis.com/bucket-videoar/f89e2272-e105-4163-9b05-5a3405085580.png"
          alt="Overlay"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-auto z-10 pointer-events-none"
        />

        {/* Your content can go here */}
        <div className="relative z-20 flex items-center justify-center  text-white p-8">
          <h1>Welcome to the site!</h1>
        </div>
      </div>
      <div>

      </div>
    </div>

  );
}
