// import { createContext, useContext, useState, ReactNode } from "react";

// type CartItem = {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image?: string;
// };

// type CartContextType = {
//   items: CartItem[];
//   addToCart: (item: CartItem) => void;
//   isOpen: boolean;
//   toggleCart: () => void;
// };

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("useCart must be used within CartProvider");
//   return context;
// };

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [items, setItems] = useState<CartItem[]>([]);
//   const [isOpen, setIsOpen] = useState(false);

//   const addToCart = (item: CartItem) => {
//     setItems((prev) => {
//       const existing = prev.find((i) => i.id === item.id);
//       if (existing) {
//         return prev.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
//         );
//       }
//       return [...prev, item];
//     });
//   };

//   const toggleCart = () => setIsOpen((prev) => !prev);

//   return (
//     <CartContext.Provider value={{ items, addToCart, isOpen, toggleCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
