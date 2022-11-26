/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales:["es", "en"],
    defaultLocale: "es",
    localeDetection: true,
  }
}

module.exports = nextConfig
