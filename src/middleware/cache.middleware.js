const redisClient = require('../config/redis');

const CACHE_TTL = 60 * 10; // 10 minutes

const cache = (keyPrefix) => async (req, res, next) => {
  const cacheKey = `${keyPrefix}:${JSON.stringify(req.query)}`;

  try {
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log(`✅ Cache HIT: ${cacheKey}`);
      return res.json({ ...JSON.parse(cached), cached: true });
    }
    console.log(`❌ Cache MISS: ${cacheKey}`);

    // Override res.json to cache the response
    const originalJson = res.json.bind(res);
    res.json = (data) => {
      redisClient.setex(cacheKey, CACHE_TTL, JSON.stringify(data));
      return originalJson(data);
    };
    next();
  } catch (err) {
    console.error('Redis cache error:', err);
    next(); // Don't block request if Redis fails
  }
};

const clearCache = async (pattern) => {
  const keys = await redisClient.keys(`${pattern}:*`);
  if (keys.length > 0) await redisClient.del(...keys);
};

module.exports = { cache, clearCache };
