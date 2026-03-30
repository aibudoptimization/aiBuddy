import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/Getstarted",
        destination: "/getstarted",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
