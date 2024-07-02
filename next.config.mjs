/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY
  }
};

export default nextConfig;