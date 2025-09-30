import LocaleSwitcher from "@/components/locale-switcher";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home(props: Props) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations('HomePage');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href="/test">Test</Link>
      <LocaleSwitcher />
    </div>
  );
}
