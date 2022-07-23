module.exports = {
    publicPath: process.env.NODE_ENV === 'development'
      ? '/'
      : 'http://localhost:8080',
    publicPath: process.env.NODE_ENV === 'development2'
      ? '/dist/'
      : '/',
    // publicPath: process.env.NODE_ENV === 'development3'
    // ? ''
    // : '/',
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