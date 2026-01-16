const { format, createLogger, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const { combine, timestamp, label, printf, prettyPrint } = format;
const CATEGORY = "Epital API Call";

const logger = createLogger({
  level: "info",
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss"
    }),
    prettyPrint()
  ),
  transports: [
    
    new DailyRotateFile({
      filename: "./logs/apiCalls%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m"
   
    })
  ]
});

module.exports = logger;