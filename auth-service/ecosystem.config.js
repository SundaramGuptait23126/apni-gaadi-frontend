module.exports = {
  apps: [{
    name: "auth-service",
    script: "./server.js",
    instances: "max", // Uses all available CPU cores
    exec_mode: "cluster",
    env: {
      NODE_ENV: "production",
    }
  }]
}
