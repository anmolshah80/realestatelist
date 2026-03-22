import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // dangerouslyAllowLocalIP -> https://nextjs.org/docs/app/api-reference/components/image#dangerouslyallowlocalip
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'photos.zillowstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
      },
    ],
  },
};

export default nextConfig;
