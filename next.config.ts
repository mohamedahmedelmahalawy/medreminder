import type { NextConfig } from "next";

const isCI = process.env.CI === "true" || process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  //  Don’t fail next build on ESLint errors in CI/Vercel
  eslint: {
    ignoreDuringBuilds: isCI,
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/" },
      { protocol: "https", hostname: "assets.zyrosite.com", pathname: "/" },
    ],
  },
};

export default nextConfig;