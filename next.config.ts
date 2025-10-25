import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  env: {
    MAP_BOX: process.env.MAP_BOX_ACCESS_TOKEN,
  },
};

export default nextConfig;
