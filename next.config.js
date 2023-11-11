/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"]
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'referrer-policy', value: 'no-referrer' }
                ]
            }
        ]
    },
    async redirects() {
        return [
          {
            source: '/',
            destination: '/products',
            permanent: true,
          },
        ]
    },

}

module.exports = nextConfig
