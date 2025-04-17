import { Product } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import DeleteButton from '../delete-button';

export default function Card(props: Product & { role: string }) {
  return (
    <>
      <Link href={`/categories/${props.categoryId}/${props.productId}`} className="drop-shadow-xl w-64 h-80">
        <div className="relative w-full h-full overflow-hidden rounded-xl bg-[#3d3c3dcc] bg-opacity-60 flex flex-col">

          {/* Button Container - using flex to position buttons */}
          {props.role === "ADMIN" && (
            <div className="absolute top-2 left-2 right-2 flex justify-between w-full px-2 z-10">
              {/* Edit button (on the left) */}
              <Link href={`/products/${props.productId}`}>
                <div className="bg-purple-600 text-white px-3 py-2 rounded-md hover:bg-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 32 32">
                    <path d="M 23.900391 3.9726562 C 22.853426 3.9726562 21.805365 4.3801809 20.992188 5.1933594 L 5.1796875 21.007812 L 3.7246094 28.275391 L 10.992188 26.820312 L 11.207031 26.607422 L 26.806641 11.007812 C 28.432998 9.381456 28.432998 6.8197164 26.806641 5.1933594 C 25.993462 4.3801809 24.947355 3.9726563 23.900391 3.9726562 z M 23.900391 5.8769531 C 24.403426 5.8769531 24.905757 6.1206004 25.392578 6.6074219 C 26.366221 7.5810649 26.366221 8.620107 25.392578 9.59375 L 24.699219 10.285156 L 21.714844 7.3007812 L 22.40625 6.6074219 C 22.893072 6.1206004 23.397355 5.8769531 23.900391 5.8769531 z M 20.300781 8.7148438 L 23.285156 11.699219 L 11.175781 23.810547 C 10.519916 22.5187 9.4812999 21.480084 8.1894531 20.824219 L 20.300781 8.7148438 z M 6.9042969 22.576172 C 8.0686534 23.064699 8.9374718 23.931222 9.4257812 25.095703 L 6.2753906 25.726562 L 6.9042969 22.576172 z"></path>
                  </svg>
                </div>
              </Link>

              {/* Delete button (on the right) */}
              <DeleteButton
                productId={props.productId}
              />
            </div>
          )}

          {/* Image Section - fills remaining space */}
          <div className="relative w-full h-90 overflow-hidden">
            <Image
              src={props.image}
              alt={props.name}
              fill
              className="object-contain"
            />
          </div>

          {/* Bottom Section - pinned to bottom */}
          <div className="p-2 text-white bg-[#323132cc] flex flex-col justify-between flex-grow">
            <div className="text-sm font-semibold truncate">{props.name}</div>
            <div className="text-xs text-gray-300">${props.price.toFixed(2)}</div>
            <div>Stock: {props.stock}</div>
            <button className="mt-2 bg-purple-600 text-white px-4 py-2 font-bold rounded-md hover:opacity-80 w-full">
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </>
  );
}
