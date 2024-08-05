'use client'

import { useAuth } from "@/hook/useAuth";

export function AuthStatus({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;

  return children({ user });
}