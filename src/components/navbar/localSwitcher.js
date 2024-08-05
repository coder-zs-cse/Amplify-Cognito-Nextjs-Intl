'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const localActive = useLocale();

  const onSelectChange = (e) => {
    const nextLocale = e.target.value;
    const currentPathname = pathname;
    
    // Remove the current locale from the pathname
    const newPathname = currentPathname.replace(`/${localActive}`, '');
    
    // Construct the new path with the new locale
    const newPath = `/${nextLocale}${newPathname}` || `/${nextLocale}`;
    
    startTransition(() => {
      router.replace(newPath);
    });
    // const nextLocale = e.target.value;
    // const currentPath = window.location.pathname;
    // const newPath = `/${nextLocale}${currentPath.substring(currentPath.indexOf('/', 1))}`;
    // window.location.href = newPath;
    // startTransition(() => {
    //   router.replace(`/${nextLocale}`);
    // });
  };
  return (
    <label className='border-2 rounded'>
      <p className='sr-only'>change language</p>
      <select
        defaultValue={localActive}
        className='bg-transparent py-2'
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value='en'>English</option>
        <option value='id'>Indonesian</option>
      </select>
    </label>
  );
}