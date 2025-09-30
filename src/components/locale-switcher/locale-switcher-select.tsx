'use client';

import clsx from 'clsx';
import { ChangeEvent, ReactNode, useTransition } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    const currentUrl = new URL(window.location.href);

    const searchParams = currentUrl.searchParams;

    startTransition(() => {
      router.replace(`${pathname}?${searchParams}`, { locale: nextLocale });
    });
  }

  return (
    <label
      className={clsx(
        'text-black',
        isPending && 'transition-opacity [&:disabled]:opacity-30 ',
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        className="font-inter inline-flex appearance-none bg-transparent text-base pt-0 focus:border-none focus:ring-0 cursor-pointer focus:outline-none"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <img
        src="/icons/header/arrow-down-black.svg"
        aria-hidden="true"
        className="ml-1 inline-block  "
      />
    </label>
  );
}
