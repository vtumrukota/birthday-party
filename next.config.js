/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    WIKI_ACCESS_TOKEN: process.env.WIKI_ACCESS_TOKEN,
    WIKI_USER_AGENT: process.env.WIKI_USER_AGENT,
  }
}

module.exports = nextConfig
