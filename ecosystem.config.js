module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // First application
    {
      name: "SCREEN",
      script: "src/index.js",
      env: {
        NODE_ENV: "screen",
        port: 10000
      },
    }
  ],
  deploy: {
    // "production" is the environment name
    production: {
      // SSH user
      user: "peder",
      // SSH host
      host: ["pm.alveroverland.com"],
      // SSH options with no command-line flag, see 'man ssh'
      // can be either a single string or an array of strings
      ssh_options: "StrictHostKeyChecking=no",
      // GIT remote/branch
      ref: "origin/master",
      // GIT remote
      repo: "https://github.com/pederOverland/divecalcresults.git",
      // path in the server
      path: "/var/www/divecalcresults",
      // Pre-setup command or path to a script on your local machine
      // 'pre-setup': "apt-get install git ; ls -la",
      // Post-setup commands or path to a script on the host machine
      // eg: placing configurations in the shared dir etc
      'post-setup': "ls -la",
      // pre-deploy action
      'pre-deploy-local': "echo 'This is a local executed command'",
      // post-deploy action
      'post-deploy': "npm install",
    },
  }
};
