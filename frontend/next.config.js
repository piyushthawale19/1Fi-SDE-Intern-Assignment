/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'store.storeimages.cdn-apple.com',
      'images.samsung.com',
      'm.media-amazon.com',
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
