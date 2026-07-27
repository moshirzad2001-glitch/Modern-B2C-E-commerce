import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
      protocol: 'https',
      hostname: '//unsplash.com'
    },
    {
      protocol: 'https',
      hostname: 'dummyjson.com',
      
    },
    {
      protocol: 'https',
      hostname:"cdn.dummyjson.com",
    },
    ]
  },
allowedDevOrigins: ['192.168.77.15'],
};

export default nextConfig;
