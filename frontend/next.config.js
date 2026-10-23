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
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'enginexsolution.me',
          },
        ],
        destination: 'https://www.enginexsolutions.in/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.enginexsolution.me',
          },
        ],
        destination: 'https://www.enginexsolutions.in/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'enginex.solutions',
          },
        ],
        destination: 'https://www.enginexsolutions.in/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.enginex.solutions',
          },
        ],
        destination: 'https://www.enginexsolutions.in/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
