/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      domains: ["lh3.googleusercontent.com"],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      };
      config.externals = {
        ...config.externals,
        mongoose: 'commonjs mongoose',
      };
      return config;
    },
  };
  
  module.exports = nextConfig;
  