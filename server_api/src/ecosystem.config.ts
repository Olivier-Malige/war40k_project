export default {
  apps: [
    {
      name: 'warhammer_api',
      script: './bin/www',
      instances: 'max',
      autorestart: true,
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};