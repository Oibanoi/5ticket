import {useLocale} from 'next-intl';
import {SWITCH_LOCALES } from 'i18n/constants';
import LocaleSwitcherSelect from './locale-switcher-select';

export default function LocaleSwitcher() {
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={locale}>
      {SWITCH_LOCALES.map((cur) => (
        <option key={cur.value} value={cur.value} >
          {cur.label}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
