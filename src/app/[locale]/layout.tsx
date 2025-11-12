import { HeaderWrapper } from "@/components/header/HeaderWrapper";
import { redditSans } from "@/fonts";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/providers/auth-provider";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { SessionProvider } from "@/providers/session-provider";
import "@/styles/globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

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
