/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', 
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/admin/:path*", 
        destination: "/admin/:path*", 
      },
      {
        source: "/:path*", 
        destination: "/client/:path*", 
      },
    ];
  },
};

export default nextConfig;
