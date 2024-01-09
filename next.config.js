/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    modularizeImports: {
        "@mui/icons-material": {
            transform: "@mui/icons-material/{{member}}"
        },
    },
    images: {
        remotePatterns: ['raw.githubusercontent.com', 's2.coinmarketcap.com'],
    },
};

module.exports = nextConfig;
