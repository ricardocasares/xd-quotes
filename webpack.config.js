module.exports = {
  mode: 'development',
  entry: './src/main.jsx',
  output: {
    path: __dirname,
    filename: 'main.js',
    libraryTarget: 'commonjs2',
  },
  devtool: false,
  externals: {
    commands: 'commands',
    application: 'application',
    scenegraph: 'scenegraph'
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      // Babel
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
        resolve: {
          extensions: [".js", ".jsx"],
        },
      },
      // CSS
      {
        test: /\.css$/i,
        use: [{ loader: "style-loader", options: { esModule: false } }, "css-loader"],
      },
      // Images
      {
        test: /\.(png|jpg|svg)$/i,
        loader: "file-loader",
      },
    ],
  }
};