import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },

  transpilePackages: ["@monorepo/shared-types"],
  images: {
    remotePatterns: [
      // 1. Matches the exact error message (Google Auth avatars usually use this)
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**", // Allows all paths, not just /account123/
      },
      // 2. Matches the exact src string in your <Image> component
      {
        protocol: "http",
        hostname: "googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      // 3. Recommended: HTTPS version of the standard domain
      {
        protocol: "https",
        hostname: "googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
