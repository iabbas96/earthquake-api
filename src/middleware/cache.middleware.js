const redisClient = require('../config/redis');

const CACHE_TTL = 60 * 10;

const cache = (keyPrefix) => async (req, res, next) => {
  const cacheKey = `${keyPrefix}:${JSON.stringify(req.query)}`;

  try {
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.json({ ...JSON.parse(cached), cached: true });
    }

    const originalJson = res.json.bind(res);
    res.json = (data) => {
      redisClient.setex(cacheKey, CACHE_TTL, JSON.stringify(data))
        .catch(err => console.error('Cache set error:', err.message));
      return originalJson(data);
    };
    next();
  } catch (err) {
    console.error('Cache error:', err.message);
    next(); // Always continue even if Redis fails
  }
};

const clearCache = async (pattern) => {
  try {
    const keys = await redisClient.keys(`${pattern}:*`);
    if (keys.length > 0) await redisClient.del(...keys);
  } catch (err) {
    console.error('Cache clear error:', err.message);
  }
};

module.exports = { cache, clearCache };