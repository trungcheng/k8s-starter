const jwt = require('jsonwebtoken');

module.exports = async function isAuthenticated(req, res, next) {
  const token = req.headers['access-token'];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: err });
    } else {
      req.currentUser = user;
      next();
    }
  });
};
