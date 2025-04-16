"use client"
import UserCard from "@/components/user-card";
import { useEffect, useState } from "react";


export default function User() {

  const [user, setUser] = useState(null);

  //fetch for the user data to use it on the user page
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("/api/auth/user");
        if (response.ok) {
          const data = await response.json();
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
    <div className=" min-h-screen flex items-center justify-center">
      <div>
        <img
          src="https://storage.googleapis.com/bucket-videoar/8fe51696-2dc9-494e-b196-e57fd4d596f8.jpg"
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover -z-10 blur-sm"
        />
      </div>
      {/* loading para esperar a que se haga la busqueda de los datos del usuario */}
      {user ? (
        <UserCard user={user} />
      ) : (
        // modificar para que aparezca un logo de carga en vez de texto fijo
        <div>
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );

}