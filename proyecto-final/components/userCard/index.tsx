/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@prisma/client';
import React from 'react';

export default function Card(props: User) {
  return (
    <div className="drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl bg-[#3d3c3d] flex flex-col">
      {/* Image - Top 65% */}
      <div className=" h-[65%] w-full overflow-hidden">
        
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col justify-between h-[35%] p-2 text-white bg-[#323132]">
        <div className="text-sm font-semibold truncate">{props.name}</div>
        <div className="text-sm font-semibold truncate">{props.email}</div>       
      </div>
    </div>
  );
}
