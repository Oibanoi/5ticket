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
        <Button variant="ghost" className="text-sm flex items-center space-x-2">
          <Image
            src={languages[locale as keyof typeof languages].flag}
            alt={languages[locale as keyof typeof languages].label}
            width={20}
            height={14}
            className="rounded-sm"
          />
          <span>{languages[locale as keyof typeof languages].label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem onClick={() => handleLanguageChange("vi")}>
          <Image src={languages.vi.flag} alt="VI" width={20} height={14} className="rounded-sm" />
          <span className="ml-2">{languages.vi.name}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
          <Image src={languages.en.flag} alt="EN" width={20} height={14} className="rounded-sm" />
          <span className="ml-2">{languages.en.name}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
