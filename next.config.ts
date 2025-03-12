import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
     // Disable the App Router if you are using Pages Router
  },
  // You can add other config options here as needed
};
module.exports = {
  images: {
    domains: ['www.pexels.com', 'images.pexels.com'], // Add Pexels domains here
  },
};

export default nextConfig;
