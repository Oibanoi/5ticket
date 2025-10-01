"use client";
import { useTranslations } from "next-intl";

export default function TestPage() {
  const t = useTranslations("HomePage");
  return <div className="bg-background text-foreground">{t("title")}</div>;
}
