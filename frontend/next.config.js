/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'enginex-api.onrender.com'],
    formats: ['image/avif', 'image/webp'],
  },

}

module.exports = nextConfig
