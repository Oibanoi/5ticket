import { env } from "@/lib/env/index.mjs";
import { getMeSummary, login, loginWithGoogle, logout } from "@/services/user";
import { NextAuthOptions, Session, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

function getEnv(
  credentials: Record<"email" | "password" | "isDevelopment", string> | undefined,
  req: { headers?: Record<string, string> }
) {
  return credentials?.isDevelopment == "true"
    ? "dev"
    : req.headers?.["data-env"] == "dev"
      ? "dev"
      : "prod";
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "e.g. example@example.com",
        },
        password: { label: "Mật khẩu", type: "password" },
        isDevelopment: { label: "Is Development?", type: "checkbox" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const env = getEnv(credentials, req);
        try {
          const { data, success, message } = await login(credentials!, { timeout: 6000 });
          if (!success || !data?.access_token) throw new Error(message || "Login failed");

          const { data: profile, success: ok } = await getMeSummary({
            headers: { Authorization: `Bearer ${data.access_token}` },
          });
          if (!ok || !profile) throw new Error("User fetch failed");

          return {
            id: String(profile.id),
            name: profile.name,
            email: profile.email,
            avatar: profile.avatar,
            access_token: data.access_token,
            env,
          };
        } catch (err) {
          console.error("[Auth] authorize error:", err);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      idToken: true,
    }),
  ],
  events: {
    async signOut({ session }) {
      try {
        if (session?.access_token)
          await logout({ headers: { Authorization: `Bearer ${session.access_token}` } });
      } catch (err) {
        console.warn("[Auth] Logout failed:", err);
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 22 * 60 * 60, // 22h
  },

  // Disable default error page - errors will be handled in client
  pages: {
    signIn: "/", // Redirect to home instead of default sign-in page
    error: "/", // Redirect to home instead of default error page
  },

  callbacks: {
    async jwt({ token, account, user }) {
      // NOTE: Logic login with google
      if (account?.provider === "google" && account?.id_token) {
        const googleLoginData = await loginWithGoogle(account.id_token);

        if (!googleLoginData.success || !googleLoginData.data) {
          throw new Error("Google login failed");
        }

        const responseUser = await getMeSummary({
          headers: {
            Authorization: "Bearer " + googleLoginData.data.access_token,
          },
        });

        if (responseUser.success && responseUser.data) {
          return {
            ...responseUser.data,
            access_token: googleLoginData.data.access_token,
            id: responseUser.data.id.toString(),
            name: responseUser.data.name,
            email: responseUser.data.email,
            avatar: responseUser.data.avatar,
            env: "prod",
          };
        }
        throw new Error("Google login failed");
      }
      return {
        ...token,
        ...user,
      };
    },
    async session({ session, token }) {
      session.user = {
        id: token.id.toString(),
        name: token.name,
        email: token.email,
        avatar: token.avatar as string,
      };
      session.access_token = token.access_token;
      return session;
    },
  },
};

export const getEkycName = (user: {
  is_ekyc_success?: boolean;
  id_cards?: Array<{ name: string }>;
  name: string;
}): string => {
  if (user?.is_ekyc_success && user.id_cards?.[0]?.name) {
    return user.id_cards[0].name;
  }
  return user.name;
};

export const getSession = () => getServerSession(authOptions) as Promise<Session>;
