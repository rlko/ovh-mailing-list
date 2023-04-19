
const { createLogger, format, transports } = require("winston");

class CustomLogger {
    logger;
    constructor() {
        this.init();
    };

    init() {
        const logConf =  this.getLogConf();
        this.logger = createLogger(logConf);
        this.logger.info("Logger initialized");
    }

    getLogConf() {
        return {
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.timestamp(),
                format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
            ),
            transports: [
                new transports.File({ filename: 'logs/error.log', level: 'error' }),
                new transports.File({ filename: 'logs/combined.log' })
            ]
        };
    }

}

const loggerInstance = new CustomLogger();
const logger = loggerInstance.logger;
//Singleton
module.exports = {
    logger: logger,
    loggerConf: loggerInstance
};