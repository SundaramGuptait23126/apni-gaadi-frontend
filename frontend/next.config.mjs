/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'http://3.25.228.91:5001/api/auth/:path*',
      },
      {
        source: '/api/cars/:path*',
        destination: 'http://3.25.228.91:5002/api/cars/:path*',
      },
      {
        source: '/api/compare/:path*',
        destination: 'http://3.25.228.91:5003/api/compare/:path*',
      },
    ];
  },
};

export default nextConfig;
