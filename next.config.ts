/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Remove the typescript config - it's not a valid option
}

module.exports = nextConfig