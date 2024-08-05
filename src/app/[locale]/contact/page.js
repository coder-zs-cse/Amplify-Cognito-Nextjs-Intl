'use client'


import { useSession } from "next-auth/react"

function contact() {
  const { data: session, status: sessionStatus } = useSession() 
  console.log(session);
  
  return (
    <div>contact</div>
  )
}

export default contact