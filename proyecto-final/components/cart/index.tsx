// import { useCart } from "@/context/CartContext";
// import { X } from "lucide-react";

// const CartSidebar = () => {
//   const { items, isOpen, toggleCart } = useCart();

//   const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-4 transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Carrito</h2>
//         <button onClick={toggleCart}>
//           <X className="w-5 h-5" />
//         </button>
//       </div>

//       {items.length === 0 ? (
//         <p className="text-gray-500">Tu carrito está vacío.</p>
//       ) : (
//         <div className="space-y-4">
//           {items.map((item) => (
//             <div key={item.id} className="flex justify-between items-center">
//               <div>
//                 <p>{item.name}</p>
//                 <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
//               </div>
//               <p>${(item.price * item.quantity).toFixed(2)}</p>
//             </div>
//           ))}

//           <div className="mt-4 font-semibold border-t pt-4">
//             Total: ${totalPrice.toFixed(2)}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartSidebar;
