/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "images-na.ssl-images-amazon.com",
      },
      {
        hostname: "i.gr-assets.com",
      },
    ],
  },
};

module.exports = nextConfig;
