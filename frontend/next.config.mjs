/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://3.25.228.91/api/:path*',
      },
    ];
  },
};

export default nextConfig;
