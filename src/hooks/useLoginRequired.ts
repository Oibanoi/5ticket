import { useAuth } from "@/contexts/AuthContext";
import { useSession } from "next-auth/react";

/**
 * Hook to require login before performing an action
 *
 * @example
 * const loginRequired = useLoginRequired();
 *
 * const handleBookTicket = () => {
 *   loginRequired(() => {
 *     // This code only runs after user is logged in
 *     bookTicket();
 *   });
 * };
 */
export const useLoginRequired = () => {
  const { loginRequired } = useAuth();
  return loginRequired;
};

/**
 * Hook to check if user is authenticated
 */
export const useIsAuthenticated = () => {
  const { data: session, status } = useSession();
  return {
    isAuthenticated: !!session,
    isLoading: status === "loading",
    user: session?.user,
  };
};
