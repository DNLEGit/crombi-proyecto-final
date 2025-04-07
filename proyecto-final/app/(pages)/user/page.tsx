// "use client"
// import UserCard from "@/components/userCard";
// import { useEffect, useState } from "react";


// export default function User(){

//     const [user, setUser] = useState(null);
    

//     useEffect(() => {
//         async function fetchUserData() {
//             try {
//                 const response = await fetch("/api/user");
//                 if (response.ok) {
//                     const data = await response.json();
//                     console.log("data from db", data)
//                     setUser(data.user);
//                 } else {
//                     console.error("Failed to fetch user data");
//                 }
//             } catch (error) {
//                 console.error("Error fetching user data:", error);
//             }
//         }

//         fetchUserData();
//     }, []);
    
//     return(
//         <div className="bg-gray-950">
//             <UserCard props={user}/>
//         </div>
//     );
// }