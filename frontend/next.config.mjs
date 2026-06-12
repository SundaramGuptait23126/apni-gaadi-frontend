/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'http://13.239.116.36:5001/api/auth/:path*',
      },
      {
        source: '/api/cars/:path*',
        destination: 'http://13.239.116.36:5002/api/cars/:path*',
      },
      {
        source: '/api/compare/:path*',
        destination: 'http://13.239.116.36:5003/api/compare/:path*',
      },
    ];
  },
};

export default nextConfig;
