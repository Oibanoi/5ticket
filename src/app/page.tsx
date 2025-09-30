import { DEFAULT_LOCALE } from '@/i18n/constants';
import {redirect} from 'next/navigation';

// This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
  redirect('/'+ DEFAULT_LOCALE);
}