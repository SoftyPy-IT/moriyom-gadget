/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "www.startech.com.bd",
      },
      {
        protocol: "https",
        hostname: "dvf83rt16ac4w.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
