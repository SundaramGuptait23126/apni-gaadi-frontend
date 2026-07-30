/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://54.79.164.28/api/:path*',
      },
    ];
  },
};

export default nextConfig;
