/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com"
            },
            {
                protocol: "https",
                hostname: "images.pexels.com"
            },
            {
                protocol: "https",
                hostname: "i.pinimg.com"
            }
        ]
    }
};

export default nextConfig;
