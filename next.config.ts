import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/graph-proxy/:path*',
        destination: 'https://api-graph.tests.grupoapok.com/:path*',
      },
    ];
  },
};

export default nextConfig;
