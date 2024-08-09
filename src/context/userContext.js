'use client'
import React, { createContext, useContext } from 'react';
import useAuthUser from '@/hooks/use-auth-user';
import 'aws-amplify/auth/enable-oauth-listener';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const user = useAuthUser();
  // console.log("user inside userproviders", user);
  
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);