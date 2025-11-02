import { routing } from "@/i18n/routing";
import { redditSans } from "@/fonts";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { HeaderWrapper } from "@/components/header/HeaderWrapper";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { SessionProvider } from "@/providers/session-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { getSession } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={cn("bg-background text-foreground", redditSans.className, redditSans.variable)}
      >
        <SessionProvider>
          <ReactQueryProvider>
            <NextIntlClientProvider messages={messages}>
              <AuthProvider>
                <HeaderWrapper />
                {children}
              </AuthProvider>
            </NextIntlClientProvider>
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
