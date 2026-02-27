/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      { source: "/icf-builds", destination: "/builds-renovations", permanent: true },
    ];
  },
};

export default nextConfig;
