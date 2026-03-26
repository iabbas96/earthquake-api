const Redis = require('ioredis');

let redisClient;

if (process.env.REDIS_URL) {
  redisClient = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: 3,
    retryStrategy: (times) => {
      if (times > 3) return null;
      return Math.min(times * 200, 1000);
    },
    tls: {
      rejectUnauthorized: false
    }
  });
} else {
  redisClient = new Redis({
    host: '127.0.0.1',
    port: 6379,
    maxRetriesPerRequest: 3
  });
}

redisClient.on('connect', () => console.log('✅ Redis Connected'));
redisClient.on('error', (err) => console.error('❌ Redis Error:', err.message));

module.exports = redisClient;