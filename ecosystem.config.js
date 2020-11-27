module.exports = {
  apps: [
    {
      name: "webapp",
      script: 'index.js',
      exp_backoff_restart_delay: 100,
      env: {
        PORT: 5000,
        NODE_ENV: "production"
      }
    }
  ],

  // deploy: {
  //   production: {
  //     user: 'chlab',
  //     host: ['186.136.242.99'],
  //     path: '/var/www/webapp',
  //     repo: 'git@github:TobiasDemoor/webapphydroponicssystem.git',
  //     ref: "origin/dev",
  //     'pre-deploy-local': '',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': 'apt install git; apt install nodejs; apt install npm; npm install -g pm2'
  //   }
  // }
};

