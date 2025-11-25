import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'Blq-venture';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repoName}` : '',
  },
};

export default nextConfig;
