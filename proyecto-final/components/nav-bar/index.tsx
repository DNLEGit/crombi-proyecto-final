import Link from 'next/link';
import React from 'react';


const NavBar: React.FC = () => {
    return (
        <div className='flex justify-between items-center p-4 bg-gradient-to-l from-[#42285f] to-[#2F0743] h-28 text-white '>

            {/* Botón Home a la izquierda */}
            <div className='flex items-center font-Arial duration-500 hover:scale-115'>
                <Link href={'/'} className='mr-4 flex items-center'>
                    <svg
                        preserveAspectRatio="xMidYMid meet"
                        data-bbox="17 17.002 166.002 165.999"
                        viewBox="17 17.002 166.002 165.999"
                        height="46"
                        width="46"
                        xmlns="http://www.w3.org/2000/svg"
                        data-type="color"
                        role="img"
                        aria-label="Página de inicio"
                    >
                        <g>
                            <path
                                d="M54.331 87.495c4.406-16.714 17.655-29.828 34.401-34.112 29.968-7.668 57.117 12.228 61.475 39.711.552 3.483 2.105 6.729 4.599 9.223l19.149 19.149c2.211 2.211 5.988 1.144 6.723-1.894 3.668-15.163 3.177-31.948-2.79-49.095-8.087-23.242-26.742-41.364-50.144-48.976C60.747-.296-.254 60.667 21.471 127.658c7.58 23.373 25.64 42.024 48.826 50.158 17.08 5.991 33.797 6.533 48.916 2.945 3.048-.723 4.124-4.511 1.909-6.726l-20.582-20.582c-2.285-2.285-5.217-3.788-8.388-4.413-26.668-5.25-45.59-32.077-37.821-61.545z"
                                fill="#FFFFFF"
                                data-color="1"
                            ></path>
                            <path
                                d="M150.451 126.185a44.142 44.142 0 0 1-24.881 24.3c-3.495 1.347-4.473 5.821-1.824 8.469l21.968 21.968a7.092 7.092 0 0 0 5.014 2.077h26.29a5.56 5.56 0 0 0 5.559-5.559v-26.29a7.09 7.09 0 0 0-2.077-5.014L158.864 124.5c-2.603-2.601-7.009-1.717-8.413 1.685z"
                                fill="#FFFFFF"
                                data-color="1"
                            ></path>
                            <path
                                fill="#FFFFFF"
                                d="M126.255 100.847c0 13.565-10.996 24.561-24.561 24.561s-24.561-10.996-24.561-24.561 10.996-24.561 24.561-24.561 24.561 10.996 24.561 24.561z"
                                data-color="1"
                            ></path>
                        </g>
                    </svg>
                    <span className="text-[25px] p-2 font-bold ">VIDEOAR</span>
                </Link>
            </div>


            {/* Botones de categorías y productos centrados */}


            {/* Botón User a la derecha */}
            <div className='flex justify-end '>
                <div className='flex justify-between items-center'>
                    <div className='m-2 hover:text-[#8858ed]'>
                        <Link href={'/categories'}> Categories </Link>
                    </div>
                    <div className='m-2 hover:text-[#8858ed]'>
                        <Link href={'/products'}> Products </Link>
                    </div>
                    <div className='m-2 hover:text-[#8858ed]'>
                        <Link href={'/user'}>User</Link>
                    </div>

                    <div>
                        <p>carrito</p>
                    </div>


                </div>



            </div>
        </div>
    );
};

export default NavBar;

//todo- ponerle un icono al carrito
//poner icono de usuario
