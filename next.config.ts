import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "hhygnkh3un.ufs.sh",
        pathname: "/f/**",
      },
    ],
  },
};

export default nextConfig;
