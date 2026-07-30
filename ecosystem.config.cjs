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
      name: 'apni-gaadi-profile',
      script: 'server.js',
      cwd: './profile-service',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'apni-gaadi-search',
      script: 'server.js',
      cwd: './search-service',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'apni-gaadi-api-gateway',
      script: 'server.js',
      cwd: './api-gateway',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'apni-gaadi-frontend',
      script: 'npm',
      args: 'run dev',
      cwd: './frontend',
      env: {
        NODE_ENV: 'development'
      }
    }
  ]
};
