module.exports = {
  // publicPath: '/jingdong',
  devServer: {
    open: true,
    hot: true,
    disableHostCheck: true,
    inline: true,
    port: "8088",
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
      ],
    },
  },
};
