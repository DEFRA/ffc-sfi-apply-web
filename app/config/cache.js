const expiresIn = 3600 * 1000 * 24 * 3 // 12 hours

module.exports = {
  expiresIn,
  options: {
    host: process.env.REDIS_HOSTNAME,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    partition: process.env.REDIS_PARTITION ?? 'ffc-sfi-apply-web',
    tls: process.env.NODE_ENV === 'production' ? {} : undefined
  }
}
