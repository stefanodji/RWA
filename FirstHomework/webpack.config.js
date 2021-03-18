const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map', //za debagiranje - bez toga ne moze (inspect tab -> bez toga samo bondle.js file)
  module: {
    rules: [
      {
        test: /\.tsx?$/, //uhvati sve tsx i jos neke faljlove
        use: 'ts-loader', //za njih pokreni ts loader
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  }
};