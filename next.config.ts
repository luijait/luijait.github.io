import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: process.env.DEPLOY_TARGET !== 'github',
  ...(process.env.DEPLOY_TARGET === 'github' ? { output: 'export' } : {}),
};

export default nextConfig;
