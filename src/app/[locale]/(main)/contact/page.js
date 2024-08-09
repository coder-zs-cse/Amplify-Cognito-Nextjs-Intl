'use client'

import { useUser } from "@/context/userContext";

function profile() {
  const user = useUser();

  console.log(user);
  
  return (
    <div>profile, Hi {user?.name}!</div>
  )
}

export default profile