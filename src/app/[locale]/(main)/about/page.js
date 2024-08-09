"use client";
import React from "react";
import { useUser } from "@/context/userContext";
function page() {
  const user = useUser();
  console.log("about ",user);
  
  return <div>About, {user?.name}</div>;
}

export default page;
