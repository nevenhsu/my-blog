const createNextIntlPlugin = require('next-intl/plugin')

const isProd = process.env.NODE_ENV === 'production'
const compiler = isProd ? { removeConsole: true } : {}

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler,
  webpack: (config, options) => {
    // svgr
    config.module.rules.map(rule => {
      if (rule.test && rule.test.source && rule.test.source.includes('|svg|')) {
        rule.test = new RegExp(rule.test.source.replace('|svg|', '|'))
      }
    })
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  transpilePackages: ['three'],
}

module.exports = withNextIntl(nextConfig)
