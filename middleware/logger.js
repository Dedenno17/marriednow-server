const { format } = require("date-fns");
const { v4 } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");

// LOGEVENTS FUNCTION
const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logitem = `${dateTime}\t${v4()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(process.cwd(), "logs"))) {
      await fsPromises.mkdir(path.join(process.cwd(), "logs"));
    }

    await fsPromises.appendFile(
      path.join(process.cwd(), "logs", logFileName),
      logitem
    );
  } catch (error) {
    console.log(error);
  }
};

// LOGGER MIDDLEWARE
const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logEvents, logger };
