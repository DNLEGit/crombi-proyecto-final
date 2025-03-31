import Link from 'next/link';
import React from 'react';

const NavBar: React.FC = () => {
    return (
        <div className='flex justify-between items-center p-4 bg-gray-200'>
            {/* Botón Home a la izquierda */}
            <div className='flex'>
                <Link href={'/'} className='mr-4'>Home</Link>
            </div>

            {/* Botones de categorías y productos centrados */}
            <div className='flex justify-center space-x-4'>
                <Link href={'/categories'}>Categories</Link>
                <Link href={'/products'}>Products</Link>
            </div>

            {/* Botón User a la derecha */}
            <div className='flex justify-end'>
                <Link href={'/user'}>User</Link>
            </div>
        </div>
    );
};

export default NavBar;
