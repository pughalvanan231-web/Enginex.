/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'enginex-api.onrender.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
