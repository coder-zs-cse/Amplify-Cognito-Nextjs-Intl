import React from "react";
import Navbar from "@/components/navbar/Navbar";
import { UserProvider } from "@/context/userContext";
function layout({ children }) {
  return (
    <UserProvider>
      <div>
        <Navbar />
        {children}
      </div>
    </UserProvider>
  );
}

export default layout;
