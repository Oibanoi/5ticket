import { routing } from "@/i18n/routing";
import { redditSans } from "@/fonts";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import HeaderAdmin from "@/components/layout/admin/HeaderAdmin";
import NavbarAdmin from "@/components/layout/admin/Navbar";

type Props = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: Props) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div>
        <HeaderAdmin />
        <div className="flex h-[calc(100vh-80px)]">
          <div className="w-[200px]">
            <NavbarAdmin />
          </div>
          <div className="bg-white flex-1 w-[calc(100%-180px)]">
            <div className="bg-[#F9FAFB] rounded-tl-[50px] h-fit p-12 w-[98%] mr-auto ml-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
