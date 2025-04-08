"use client"
import UserCard from "@/components/user-card";
import { useEffect, useState } from "react";


export default function User(){

    const [user, setUser] = useState(null);
    
    //fetch for the user data to use it on the user page
    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch("/api/auth/user");
                if (response.ok) {
                    const data = await response.json();
                    console.log("data from db", data)
                    setUser(data.user);
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        fetchUserData();
    }, []);
    
    return (
        <div className="bg-gray-950 min-h-screen flex items-center justify-center">
          {/* loading para esperar a que se haga la busqueda de los datos del usuario */}
          {user ? (
            <UserCard user={user} />
          ) : (
            // modificar para que aparezca un logo de carga en vez de texto fijo
            <p className="text-white p-4">Loading user...</p>
          )}
        </div>
      );
      
}