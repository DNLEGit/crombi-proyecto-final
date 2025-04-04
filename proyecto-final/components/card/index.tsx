/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
// import { Product } from '@prisma/client';

type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
};



const Card: React.FC = () => {
    return <div>

        <div className="relative drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl bg-[#3d3c3d]">

            <div className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132]">
                CARD
            </div>

            <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2">
            </div>

        </div>

    </div>;
};

export default Card;

//make the card so it can take the proprs of any product and display them 
//make so it can be paginated also
//make the search bar to filter the prods 