"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import React from "react";

export default function LocaleSwitcher() {
  const locale = useLocale();

  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = React.useTransition();

  function onSelectChange(nextLocale: string) {
    const currentUrl = new URL(window.location.href);
    const searchParams = currentUrl.searchParams;

    startTransition(() => {
      router.replace(`${pathname}?${searchParams}`, { locale: nextLocale });
    });
  }

  return (
    <Select defaultValue={locale} disabled={isPending} onValueChange={onSelectChange}>
      <SelectTrigger
        className={cn(
          "w-[90px] px-3 py-2 text-sm border-none shadow-none",
          isPending && "opacity-60"
        )}
      >
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="vi">🇻🇳 VI</SelectItem>
        <SelectItem value="en">🇬🇧 EN</SelectItem>
      </SelectContent>
    </Select>
  );
}
