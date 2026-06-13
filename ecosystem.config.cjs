module.exports = {
  apps: [
    {
      name: 'apni-gaadi-auth',
      script: 'server.js',
      cwd: './auth-service',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'apni-gaadi-car',
      script: 'server.js',
      cwd: './car-service',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'apni-gaadi-compare',
      script: 'server.js',
      cwd: './compare-car-service',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'apni-gaadi-frontend',
      script: 'npm',
      args: 'start',
      cwd: './frontend',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
