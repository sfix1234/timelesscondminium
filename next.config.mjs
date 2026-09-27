/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.PARTNER_PREVIEW_BUILD_DIR || '.next',
  serverExternalPackages: ['postgres', '@electric-sql/pglite'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  }
};

export default nextConfig;
