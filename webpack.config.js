const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    main: "./src/browser/index.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 9000,
    open: true,
    hot: true
  }
};
