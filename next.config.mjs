/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*',  // Matches any route
        destination: '/client/:path*',  // Redirects to the corresponding page in the client folder
      },
    ];
  },
};

export default nextConfig;
