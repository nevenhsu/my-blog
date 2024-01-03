declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // env
      SANITY_API_READ_TOKEN: string

      // public
      NEXT_PUBLIC_NODE_ENV: 'production' | 'development'
      NEXT_PUBLIC_BASE_URL: string
      NEXT_PUBLIC_TIMEZONE: string
      NEXT_PUBLIC_GOOGLE_ANALYTICS: string
      NEXT_PUBLIC_COLOR_SCHEME: 'dark' | 'light' | 'auto'
      NEXT_PUBLIC_SANITY_PROJECT_ID: string
      NEXT_PUBLIC_SANITY_DATASET: string
      NEXT_PUBLIC_SANITY_API_VERSION: string
      NEXT_PUBLIC_SANITY_CDN: string
    }
  }
}

export {}
