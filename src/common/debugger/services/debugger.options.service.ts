import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerOptions } from 'winston';
import winston from 'winston';
import DailyRotateFile, {
  DailyRotateFileTransportOptions,
} from 'winston-daily-rotate-file';

import { DEBUGGER_NAME } from 'src/utils/data/constants/debugger';
import { IDebuggerOptionService } from 'src/@types/interfaces/service/IDebuggerOptionService';

@Injectable()
export class DebuggerOptionService implements IDebuggerOptionService {
  private readonly env: string;
  private readonly debug: boolean;
  private readonly logger: boolean;
  private readonly maxSize: string;
  private readonly maxFiles: string;

  constructor(private configService: ConfigService) {
    this.env = this.configService.get<string>('app.env');
    this.debug = this.configService.get<boolean>('app.debug');
    this.logger = this.configService.get<boolean>('app.debugger.system.active');
    this.maxSize = this.configService.get<string>(
      'app.debugger.system.maxSize',
    );
    this.maxFiles = this.configService.get<string>(
      'app.debugger.system.maxFiles',
    );
  }

  createLogger(): LoggerOptions {
    const transports = [];

    const options = (type: string) =>
      ({
        filename: `%DATE%.log`,
        dirname: `logs/${DEBUGGER_NAME}/${type}`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: this.maxSize,
        maxFiles: this.maxFiles,
        level: 'error',
      } as unknown as DailyRotateFileTransportOptions);

    transports.push(new DailyRotateFile(options('error')));

    transports.push(new DailyRotateFile(options('default')));

    transports.push(new DailyRotateFile(options('debug')));

    if ((this.debug || this.logger) && this.env !== 'production') {
      transports.push(new winston.transports.Console());
    }

    const loggerOptions: LoggerOptions = {
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
      ),
      transports,
    };

    return loggerOptions;
  }
}
