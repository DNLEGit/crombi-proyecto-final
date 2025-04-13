/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Product } from '@prisma/client';

import Link from 'next/link';
import React from 'react';

export default function Card(props: Product) {


  return (
    <Link href={`/categories/${props.categoryId}/${props.productId}`} className="drop-shadow-xl w-64 h-80">
      {/* //Delete button  */}
      {/* <div>
        {role === "ADMIN" ? (
          <>
            <button>
              X
            </button>

          </>
        ) : null}
      </div> */}
      <div className="drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl bg-[#3d3c3d] flex flex-col">
        {/* Image - Top 65% */}
        <div className=" h-[65%] w-full overflow-hidden">
          <img
            src={props.image}
            alt={props.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col justify-between h-[35%] p-2 text-white bg-[#323132]">
          <div className="text-sm font-semibold truncate">{props.name}</div>
          <div className="text-xs text-gray-300">${props.price.toFixed(2)}</div>

          <button className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-800 text-white px-4 py-2 font-bold rounded-md hover:opacity-80">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
