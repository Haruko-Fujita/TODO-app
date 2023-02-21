import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
      format.timestamp(),  // timestampを出力する
      format.splat(),  // String interpolation splat for %d %s-style messages.
      format.json()
  ),
  transports: [
      new winston.transports.Console()
  ]
});

logger.debug('Debug Message');
logger.info('Info Message');
logger.warn('Warn Message');
logger.error('Error Message');

logger.debug('%s %s', 'Debug','Message');
logger.info('%s %s', 'Info', 'Message');
logger.warn('%s %s', 'Warn', 'Message');
logger.error('%s %s', 'Error', 'Message');