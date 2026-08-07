/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://16.176.228.203/api/:path*',
      },
    ];
  },
};

export default nextConfig;
