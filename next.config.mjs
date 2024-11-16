/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  transpilePackages: [
    "@ant-design/icons-svg",
    "rc-pagination",
    "rc-picker",
    "rc-util",
    "rc-tree",
    "rc-table",
  ],
  images: {
    domains: ['ui-avatars.com', 'loremflickr.com','image.giacngo.vn', 'www.gravatar.com',' www.vnctongiao.org', 'i.ex-cdn.com', 'www.vnctongiao.org', "imgpush.k8s.thanhshiba.live"],
  },
};

export default nextConfig;