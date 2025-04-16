

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

type User = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
};

export default function Card({ user }: { user: User }) {
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
              src={user.imageUrl}
              alt={user.name}
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
          <div className="text-lg font-bold truncate">{user.name}</div>
          <div className="text-sm font-light truncate">{user.email}</div>
        </div>

      </div>
      {/* Bottom - Button */}
      <div>
        <div className="flex justify-end mt-4">
          <Link
            href="/userUpdate"
            className="text-sm text-blue-400 hover:underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 32 32">
              <path d="M 23.900391 3.9726562 C 22.853426 3.9726562 21.805365 4.3801809 20.992188 5.1933594 L 5.1796875 21.007812 L 3.7246094 28.275391 L 10.992188 26.820312 L 11.207031 26.607422 L 26.806641 11.007812 C 28.432998 9.381456 28.432998 6.8197164 26.806641 5.1933594 C 25.993462 4.3801809 24.947355 3.9726563 23.900391 3.9726562 z M 23.900391 5.8769531 C 24.403426 5.8769531 24.905757 6.1206004 25.392578 6.6074219 C 26.366221 7.5810649 26.366221 8.620107 25.392578 9.59375 L 24.699219 10.285156 L 21.714844 7.3007812 L 22.40625 6.6074219 C 22.893072 6.1206004 23.397355 5.8769531 23.900391 5.8769531 z M 20.300781 8.7148438 L 23.285156 11.699219 L 11.175781 23.810547 C 10.519916 22.5187 9.4812999 21.480084 8.1894531 20.824219 L 20.300781 8.7148438 z M 6.9042969 22.576172 C 8.0686534 23.064699 8.9374718 23.931222 9.4257812 25.095703 L 6.2753906 25.726562 L 6.9042969 22.576172 z"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
