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
  }
}
