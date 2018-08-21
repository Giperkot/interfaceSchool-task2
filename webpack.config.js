const PUBLIC_PATH = require('path').join(__dirname, 'public');
console.log(PUBLIC_PATH);
// const { initBackendStub } = require('./backendStub/backendStub');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    /*path: PUBLIC_PATH,
    filename: 'index.js'*/

      path: PUBLIC_PATH,
      filename: "index.js",
      library: "index"
  },
  devServer: {
    contentBase: PUBLIC_PATH,
    compress: true,
    port: 3000,
    // before: initBackendStub
  }
};
