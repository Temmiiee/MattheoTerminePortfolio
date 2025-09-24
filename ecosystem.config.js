module.exports = {
  apps: [{
    name: 'portfolio',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/TemmiiePortfolio',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    min_uptime: '10s',
    max_restarts: 10,

    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      NEXT_PUBLIC_BASE_URL: 'https://mattheo-termine.fr',

      TZ: 'Europe/Paris',
    },

    error_file: '/var/log/pm2/portfolio-error.log',
    out_file: '/var/log/pm2/portfolio-out.log',
    log_file: '/var/log/pm2/portfolio.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    time: true,
    log_type: 'json',
    merge_logs: true,

    node_args: '--max-old-space-size=512',
    exec_mode: 'fork',

    ignore_watch: [
      'node_modules',
      '.git',
      '.next',
      'logs'
    ],
  }]
};