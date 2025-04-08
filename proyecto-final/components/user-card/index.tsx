/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

export default function Card({ user }: { user: User }) {
  return (
    <div className="drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl bg-[#3d3c3d] flex flex-col">
      {/* Image - Top 65% */}
      <div className=" h-[65%] w-full overflow-hidden">
        
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col h-[35%] p-2 text-white bg-[#323132]">
        <img src={user.imageUrl} alt="imageUrl" />
        <div className="text-sm font-semibold truncate">{user.name}</div>
        <div className="text-sm font-semibold truncate">{user.email}</div>  
        <p><Link href={'/userUpdate'}>update info</Link></p>
      </div>
    </div>
  );
}
