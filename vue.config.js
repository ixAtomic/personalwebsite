module.exports = {
    publicPath: process.env.NODE_ENV === 'development'
      ? '/'
      : 'http://localhost:8080',
    publicPath: process.env.NODE_ENV === 'development2'
      ? '/'
      : 'https://b9715dca.personalwebsite-3y4.pages.dev',
    devServer: {
      proxy: {
        '^/api/*': {
          target: 'http://localhost:8090',
          secure: false,
          changeOrigin: true
        },
        '^/uploads/*': {
          target: 'http://localhost:8090',
          secure: false,
          changeOrigin: true
        }
      }
    }
    
  }