/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: [
            "images.unsplash.com",
            "ykuaxkboovlonccelnlz.supabase.co",
            "lh3.googleusercontent.com",
        ],
    },
};

module.exports = nextConfig;
