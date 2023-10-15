/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ztech18.s3.amazonaws.com"],
  },
  experimental: {
    serverActions: true,
    mdxRs: true,
  },
};
const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
