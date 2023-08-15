const rateLimit = require("express-rate-limit");
const { logEvents } = require("./logger");

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 Minute
  max: 5, // Limit each IP login request per window per minute
  message: {
    message:
      "Too many login attempts from this IP, please try again after a 60 second pause",
  },
  handler: (req, res, next, options) => {
    logEvents(
      `Too Many Request: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "errLog.log"
    );
    res.status(options.statusCode).send(options.message);
  },
  standarHeaders: true, // return rate limit info in the "RateLimit-*" headers
  legacyHeaders: false, // disable the "X-RateLimit-*" headers
});

module.exports = { loginLimiter };
