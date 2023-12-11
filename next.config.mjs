await import('./env.mjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    proxyTimeout: 1000 * 600,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:3001/api/:path*`,
      },
    ]
  },
}

export default nextConfig
