module.exports = {
  images: {
    domains: ["i.ytimg.com", "yt3.ggpht.com"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = "electron-renderer";
      config.node = {
        __dirname: true,
      };
    }

    return config;
  },
};
