import { ValidationError } from '@nestjs/common';

import {
  IErrors,
  IErrorsImport,
  IValidationErrorImport,
} from '../errors/IError';
import { IMessage, IMessageOptions, IMessageSetOptions } from './IMessage';

export interface IMessageService {
  setMessage<T = string>(
    lang: string,
    key: string,
    options?: IMessageSetOptions,
  ): T;

  getRequestErrorsMessage(
    requestErrors: ValidationError[],
    customLanguages?: string[],
  ): Promise<IErrors[]>;

  getImportErrorsMessage(
    errors: IValidationErrorImport[],
    customLanguages?: string[],
  ): Promise<IErrorsImport[]>;

  get(key: string, options?: IMessageOptions): Promise<string | IMessage>;
}
