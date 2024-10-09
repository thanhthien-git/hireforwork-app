/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
