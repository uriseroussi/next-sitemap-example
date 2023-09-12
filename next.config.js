/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./src/scripts/generateSitemap');
    }

    return config;
  },
};

module.exports = nextConfig;
