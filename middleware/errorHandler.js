const { logEvents } = require("./logger");

// ERROR MIDDLEWARE
const errorHandler = (error, req, res, next) => {
  logEvents(
    `${error.name}: ${error.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );
  console.log(error.stack);

  const status = res.statusCode ? res.statusCode : 500; // error server

  res.status(status).json({ message: error.message });
};

module.exports = { errorHandler };
