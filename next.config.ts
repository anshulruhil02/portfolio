/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This will skip TypeScript checking during builds
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig