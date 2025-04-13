// import { Category, Product } from "@prisma/client";
// import React, { useState, createContext } from "react";

// interface CategoryContextType {
//     categoryProducts: Product[];
//     setCategoryProducts: React.Dispatch<React.SetStateAction<Product[]>>;
//     fetchCategoryProducts: (prod: Product) => Promise<void>;
// }

// export const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

// export function CategoryProvider({ children }: { children: React.ReactNode }) {
//     const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

//     async function fetchCategoryProducts(prod: Product) {
//         try {
//             const response = await fetch(`/api/categories/${prod.categoryId}`);
//             if (!response.ok) throw new Error("Failed to fetch category products");
//             const data = await response.json();
//             setCategoryProducts(data.categoryProducts);
//         } catch (error) {
//             console.error("Error fetching category products:", error);
//         }
//     }

//     return (
//         <CategoryContext.Provider
//         value={{
//             categoryProducts: categoryProducts;
//             setCategoryProducts: setCategoryProducts;
//             fetchCategoryProducts: fetchCategoryProducts;
//         }}
//         >
//             { children }
//         </CategoryContext.Provider>
//   );
// }
