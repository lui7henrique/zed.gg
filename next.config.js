const withPWA = require("next-pwa")
const isProd = process.env.NODE_ENV === "production"

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: "public",
    disable: !isProd
  },
  images: {
    domains: [
      "raw.communitydragon.org",
      "ddragon.leagueoflegends.com",
      "picsum.photos"
    ]
  }
})
