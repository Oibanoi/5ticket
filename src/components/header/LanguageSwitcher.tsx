"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import Image from "next/image";
const languages = {
  vi: {
    name: "Tiếng Việt",
    flag: "/flags/vn.svg",
    label: "VI",
  },
  en: {
    name: "English",
    flag: "/flags/en.svg",
    label: "EN",
  },
} as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: keyof typeof languages) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm flex items-center space-x-2 cursor-pointer hover:bg-transparent hover:text-white outline-none border-none"
        >
          <Image
            src={languages[locale as keyof typeof languages].flag}
            alt={languages[locale as keyof typeof languages].label}
            width={20}
            height={14}
          />
          <span className="font-medium">{languages[locale as keyof typeof languages].label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 bg-white border border-gray-200 shadow-lg rounded-lg p-1"
      >
        <DropdownMenuItem
          onClick={() => handleLanguageChange("vi")}
          className="flex items-center px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 cursor-pointer group"
        >
          <Image
            src={languages.vi.flag}
            alt="VI"
            width={20}
            height={14}
            className="rounded-sm transition-transform duration-200 group-hover:scale-110"
          />
          <span className="ml-3 font-medium">{languages.vi.name}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className="flex items-center px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 cursor-pointer group"
        >
          <Image
            src={languages.en.flag}
            alt="EN"
            width={20}
            height={14}
            className="rounded-sm transition-transform duration-200 group-hover:scale-110"
          />
          <span className="ml-3 font-medium">{languages.en.name}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
