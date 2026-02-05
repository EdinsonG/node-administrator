import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Cuando tu código haga fetch a '/api/graph-proxy/...'
        source: '/api/graph-proxy/:path*',
        // Next.js lo redirigirá internamente a la API externa
        destination: 'https://api-graph.tests.grupoapok.com/:path*',
      },
    ];
  },
};

export default nextConfig;
