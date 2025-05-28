/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/portfoilo-new',
  assetPrefix: '/portfoilo-new/',
}

module.exports = nextConfig 