module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/dingding-sdk'
    : '/',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
