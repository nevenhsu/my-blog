import { createLocalizedPathnamesNavigation } from 'next-intl/navigation'
import { i18nConfig } from './i18n'

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation(i18nConfig)
