/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  async rewrites() {
    return [
      {
        source: "/book/show/:id",
        destination: "/book/:id",
      },
      {
        source: "/list/show/:id",
        destination: "/list/:id",
      },
      {
        source: "/search/book",
        destination: "/search/",
      },
      {
        source: "/search/list",
        destination: "/search/",
      },
    ];
  },
  images: {
    unoptimized: true,
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
