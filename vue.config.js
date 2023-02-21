const path = require('path')
const resolve = (dir) => {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  transpileDependencies: true,
  configureWebpack() {
    return {
      resolve: {
        alias: {
          '~': resolve('.'),
          '@': resolve('src'),
        },
      }
    }
  },
  devServer: {
    proxy: "http://192.168.0.118:11111",
  }
}
