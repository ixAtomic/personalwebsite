module.exports = {
    publicPath: process.env.NODE_ENV === 'development'
      ? '/'
      : 'http://localhost:8080',
    devServer: {
      proxy: {
        '^/api/*': {
          target: 'http://localhost:8090',
          secure: false,
          changeOrigin: true
        },
      }
    }
  }