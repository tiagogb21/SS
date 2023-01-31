import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { IDebuggerLog } from 'src/@types/interfaces/debugger/IDebuggerLog';
import { IDebuggerService } from 'src/@types/interfaces/debugger/IDebuggerService';

@Injectable()
export class DebuggerService implements IDebuggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  options(requestId: string, log: IDebuggerLog, data?: any) {
    const { class: classLog, function: functionLog, path } = log;
    return {
      _id: requestId,
      class: classLog,
      function: functionLog,
      path,
      data,
    };
  }

  info(requestId: string, log: IDebuggerLog, data?: any): void {
    this.logger.info(log.description, this.options(requestId, log, data));
  }

  debug(requestId: string, log: IDebuggerLog, data?: any): void {
    this.logger.debug(log.description, this.options(requestId, log, data));
  }

  warn(_requestId: string, log: IDebuggerLog): void {
    this.logger.warn(log.description);
  }

  error(requestId: string, log: IDebuggerLog, data?: any): void {
    this.logger.error(log.description, this.options(requestId, log, data));
  }
}
