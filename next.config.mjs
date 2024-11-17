/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  transpilePackages: [
    "@ant-design/icons-svg",
    "rc-pagination",
    "rc-picker",
    "rc-util",
    "rc-tree",
    "rc-table",
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
    instrumentationHook: !!process.env.ZIPKIN_COLLECTOR_ENDPOINT,
  },
  generateBuildId: async () => {
    // This could be anything, using the latest git hash
    return process.env.BUILD_ID || "local";
  },
  images: {
    domains: [
      "ui-avatars.com",
      "loremflickr.com",
      "image.giacngo.vn",
      "www.gravatar.com",
      " www.vnctongiao.org",
      "i.ex-cdn.com",
      "www.vnctongiao.org",
      "imgpush.k8s.thanhshiba.live",
    ],
  },
};

export default nextConfig;
