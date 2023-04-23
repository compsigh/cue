/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
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
