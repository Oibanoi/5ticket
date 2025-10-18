import "next-auth/jwt";

import { DefaultSession } from "next-auth";

import { Data } from "./data";

declare module "next-auth" {
  interface User extends Data.User {
    access_token?: string;
    env?: "dev" | "prod";
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: Data.User & DefaultSession["user"] & { env?: "dev" | "prod" };
    access_token?: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
    access_token?: string;
  }
}
