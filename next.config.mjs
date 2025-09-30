/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'qrabaebwebhookbucket.s3.us-east-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'qrabaebwebhookbucket.s3.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
