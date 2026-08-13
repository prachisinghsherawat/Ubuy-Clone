import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product art is hot-linked from the original catalogue hosts. Serving the
    // remote URLs directly keeps the app working without an image-optimizer
    // round trip (and without a network dependency at build time).
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.dummyjson.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "d3ulwu8fab47va.cloudfront.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  transpilePackages: ["antd", "@ant-design/icons", "rc-util", "rc-picker"],
};

export default nextConfig;
