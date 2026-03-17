const passport = require('passport');

// Protect routes — requires valid JWT
const protect = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized — invalid or missing token' });
    }
    req.user = user;
    next();
  })(req, res, next);
};

// Admin only
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden — admin access required' });
  }
  next();
};

module.exports = { protect, adminOnly };
