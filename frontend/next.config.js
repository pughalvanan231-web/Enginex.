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
      // Canonical domain enforcement: Non-www apex domain redirect
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'enginexsolutions.in',
          },
        ],
        destination: 'https://www.enginexsolutions.in/:path*',
        permanent: true,
      },
      // Previous domain redirects
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
      // Service URL canonicalizations & legacy aliases (avoiding duplicate content)
      {
        source: '/services/web-development',
        destination: '/services/website-development',
        permanent: true,
      },
      {
        source: '/services/automation',
        destination: '/services/ai-automation',
        permanent: true,
      },
      {
        source: '/services/custom-software',
        destination: '/services/ai-automation',
        permanent: true,
      },
      {
        source: '/services/ai-ml-solutions',
        destination: '/services/ai-automation',
        permanent: true,
      },
      {
        source: '/services/ui-ux-design',
        destination: '/services/branding',
        permanent: true,
      },
      {
        source: '/services/cloud-solutions',
        destination: '/services/website-development',
        permanent: true,
      },
      {
        source: '/services/digital-transformation',
        destination: '/services/digital-marketing',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
