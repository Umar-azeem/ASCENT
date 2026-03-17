/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/products",
        destination: "https://ascent-backend.vercel.app/api/products",
      },
      {
        source: "/api/products/:id",
        destination: "https://ascent-backend.vercel.app/api/products/:id",
      },
    ];
  },
};

export default nextConfig;