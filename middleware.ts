import createMiddleware from 'next-intl/middleware'
import { env } from '@/utils/env'

export default createMiddleware({
  // A list of all locales that are supported
  locales: env.locales,

  // Used when no locale matches
  defaultLocale: 'en',

  localePrefix: 'as-needed',
})

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|studio|_next|_vercel|.*\\..*).*)',
  ],
}
