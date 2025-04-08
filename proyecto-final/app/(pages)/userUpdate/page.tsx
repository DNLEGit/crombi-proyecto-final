// "use client"

// import React, { useState } from 'react';

// const UserUpdatePage = () => {
    
//     const [formData, setFormData] = useState({
//         name: '',
//         image: '',
//         password: '',
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const  handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         const res = await fetch("/api/auth/user/id", {
//             method: "POST",
//             body:{
//                 name: formData.name,
//                 password: 

//             }},
//         });
//         console.log('Updated user data:', formData);
//     };

  

//     return (
//         <div className="user-update-page">
//             <h1>Update User Information</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="name">Name:</label>
//                     <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                     />
//                 </div>
               
//                 <div className="max-w-md mx-auto relative overflow-hidden z-10 bg-gray-900 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-purple-600 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
//                     <h2 className="text-2xl font-bold text-white mb-6">Update Your Profile</h2>
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-gray-300" htmlFor="name">
//                             Full Name
//                         </label>
//                         <input
//                             className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
//                             type="text"
//                             id="name"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
                    
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-gray-300" htmlFor="password">
//                             Password
//                         </label>
//                         <input
//                             className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
//                             type="password"
//                             id="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
//                     <div className="flex justify-end">
//                         <button
//                             type="submit"
//                             className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-800 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
//                         >
//                             Update!
//                         </button>
//                     </div>
//                 </div>
//                 <button type="submit">Update</button>
//             </form>
//         </div>
//     );
// };

// export default UserUpdatePage;