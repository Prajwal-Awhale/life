/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // <-- ✨ add this line
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
