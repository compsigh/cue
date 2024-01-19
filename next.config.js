// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    swcPlugins: [['@swc-jotai/react-refresh', {}]]
  }
}

module.exports = {
  ...nextConfig,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
}
