/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ['@consumet/extensions'],
  },
  images: {
    domains: [
      's4.anilist.co',
      'i.ytimg.com',
      'artworks.thetvdb.com',
      'media.kitsu.io',
      'media.kitsu.app',
      'kitsu-production-media.s3.us-west-002.backblazeb2.com',
      'media.themoviedb.org'
    ],
    unoptimized: true
  },
  env: {
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT || 'https://graphql.anilist.co',
  },
};

export default nextConfig;
