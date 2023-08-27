/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  rewrites: () => {
    let rewrites = []
    rewrites.push({
      source: "/chat-api/:path*",
      destination: `${process.env.CHAT_API_URL}/:path*`
    })
    rewrites.push({
      source: "/scraper-api/:path*",
      destination: `${process.env.SCRAPER_API_URL}/:path*`
    })
    rewrites.push({
      source: "/developer-portal/:path*",
      destination: `${process.env.DEVELOPER_PORTAL_URL}/:path*`
    })

    return rewrites
  }
};
