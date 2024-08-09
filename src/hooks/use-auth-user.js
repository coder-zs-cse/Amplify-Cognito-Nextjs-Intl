"use client";
import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from "aws-amplify/auth";
import { useEffect, useState } from "react";

export default function useAuthUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      console.log("inside getUser");

      const session = await fetchAuthSession();
      if (!session.tokens) {
        return;
      }
      // const { idToken } = session?.tokens
      // const jwtToken1 = idToken?.toString();
      const { accessToken } = session?.tokens;
      const jwtToken2 = accessToken?.toString();

      // console.log("jwtToken1", jwtToken1);
      console.log("jwtToken2", jwtToken2);

      console.log("my session", session);

      const user = {
        ...(await getCurrentUser()),
        ...(await fetchUserAttributes()),
        isAdmin: false,
      };

      const groups = session.tokens.accessToken.payload["cognito:groups"];
      // @ts-ignore
      user.isAdmin = Boolean(groups && groups.includes("Admin"));
      console.log("setting user", user);

      setUser(user);
    }

    getUser();
  }, []);

  return user;
}
