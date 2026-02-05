/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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