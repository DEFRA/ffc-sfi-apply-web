const defaultExpiresIn = 3600 * 1000 * 24 * 30 // 30 days

module.exports = {
  defaultExpiresIn,
  redisCatboxOptions: {
    host: process.env.REDIS_HOSTNAME,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    partition: process.env.REDIS_PARTITION ?? 'ffc-sfi-apply-web',
    tls: process.env.NODE_ENV === 'production' ? {} : undefined
  }
}
