import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
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
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**",
      },
    ],
  },
  async headers() {
    return process.env.NODE_ENV !== "production"
      ? [
          {
            source: "/:path*",
            headers: [
              {
                key: "Referrer-Policy",
                value: "no-referrer-when-downgrade",
              },
            ],
          },
        ]
      : [];
  },
};

export default nextConfig;
