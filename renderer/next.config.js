module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer'
    }

    return config
  },
  env: {
    API_URL: 'http://localhost:8080/api',
    PROXY_URL: 'http://localhost:8800',
  },
}
