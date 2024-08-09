'use client'
import { fetchAuthSession } from 'aws-amplify/auth';
import React, { useEffect } from 'react'
import { useState } from 'react'

function Blog() {
  const [session, setSession] = useState(null);
  async function getSession() {
    const session  =await fetchAuthSession();
    
    setSession(session)
  }
  useEffect(() => {
    getSession()
  }, [])

  return (
    <div>Blog, {JSON.stringify(session)}</div>
  )
}

export default Blog