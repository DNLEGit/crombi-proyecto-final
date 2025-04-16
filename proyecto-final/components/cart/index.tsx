// "use client";
// import { useState } from "react";
// import CartContent from "./CartContent"; // Este lo armás para mostrar los productos
// import { ShoppingCart } from "some-library-or-path"; // Replace with the correct library or file path

// export default function CartDrawer() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       {/* Botón del carrito */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="relative text-white p-2"
//       >
//         <ShoppingCart size={24} />
//       </button>

//       {/* Overlay oscuro detrás del drawer */}
//       {isOpen && (
//         <div
//           onClick={() => setIsOpen(false)}
//           className="fixed inset-0 bg-black/40 z-40"
//         ></div>
//       )}

//       {/* Drawer */}
//       <div
//         className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform z-50 transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex justify-between items-center p-4 border-b">
//           <h2 className="text-xl font-bold">Carrito</h2>
//           <button onClick={() => setIsOpen(false)}>✕</button>
//         </div>

//         {/* Contenido del carrito */}
//         <div className="p-4">
//           <CartContent />
//         </div>
//       </div>
//     </>
//   );
// }
