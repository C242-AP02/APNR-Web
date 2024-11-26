/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  experimental: {
      optimizePackageImports: ["@chakra-ui/react"],
  },
    
};

export default nextConfig;
