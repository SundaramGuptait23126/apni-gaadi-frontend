module.exports = {
  apps: [{
    name: "api-gateway",
    script: "./server.js",
    instances: "max", // Uses all CPU cores
    exec_mode: "cluster",
    env: {
      NODE_ENV: "production",
    }
  }]
}
