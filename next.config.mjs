/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
        source: "/company/:path*",
        destination: "/company/:path*",
      },
      {
        source: "/:path*", 
        destination: "/client/:path*", 
      },
    ];
  },
};

export default nextConfig;
