"use client";
import { useTranslations } from "next-intl";

export default function TestPage() {
    const t = useTranslations('HomePage');
    console.log(t('title'));
    return <div>{t('title')}</div>;
}