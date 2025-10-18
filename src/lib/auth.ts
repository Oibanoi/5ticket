import { NextAuthOptions, Session, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getUserInfo, login, loginWithGoogle, logout } from "@/services/user";
import { env } from "@/lib/env/index.mjs";

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
        accessToken: {},
        isDevelopment: { label: "Is Development?", type: "checkbox" },
      },
      async authorize(credentials, req) {
        const env = getEnv(credentials, req);

        let access_token = credentials?.accessToken;
        if (!access_token) {
          const res = await login(credentials!, {
            timeout: 3000,
          });
          // If no error and we have user data, return it
          if (res.success && res.data) {
            const user = res.data;
            access_token = user.access_token;
          } else {
            throw new Error(res.message);
          }
        }

        if (!access_token) throw new Error("ehasdasdas");
        const responseUser = await getUserInfo({
          headers: { Authorization: "Bearer " + access_token },
          // baseURL,
        });

        if (responseUser.success && responseUser.data)
          return Object.assign(responseUser.data, {
            access_token,
            // email: user.username,
            email: responseUser.data.email,
            picture: responseUser.data.image,
            env,
          });
        return null;
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
      await logout({
        headers: { Authorization: "Bearer " + session?.access_token },
      });
    },
  },
  session: { maxAge: 22 * 60 * 60 },
  callbacks: {
    async jwt({ token, account, user }) {
      // NOTE: Logic login with google
      if (account?.provider === "google" && account?.id_token) {
        const googleLoginData = await loginWithGoogle(account.id_token);

        if (!googleLoginData.success || !googleLoginData.data) {
          throw new Error("Google login failed");
        }

        const responseUser = await getUserInfo({
          headers: {
            Authorization: "Bearer " + googleLoginData.data.access_token,
          },
        });

        if (responseUser.success && responseUser.data) {
          return {
            ...responseUser.data,
            access_token: googleLoginData.data.access_token,
            email: responseUser.data.email,
            picture: responseUser.data.image,
          };
        }
      }
      const data = { ...token, ...user };
      return data;
    },
    async session({ session, token }) {
      type TokenWithAuth = typeof token & { access_token?: string };
      const { access_token, ..._user } = token as TokenWithAuth;

      if (access_token) {
        session.access_token = access_token;
      }
      session.user = _user;
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
