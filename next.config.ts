import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Phase 2: add your Supabase Storage host here, e.g.
    // remotePatterns: [{ protocol: "https", hostname: "<project>.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
  poweredByHeader: false,
};

export default nextConfig;
