/** @type {import('next').NextConfig} */
const imagesHosts = {
	domains: ['images.unsplash.com', 'cf.bstatic.com']
};

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: imagesHosts
};

module.exports = nextConfig;
