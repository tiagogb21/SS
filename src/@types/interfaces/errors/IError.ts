import { ValidationError } from 'class-validator';

import { ERROR_TYPE } from '../../enums/errors/error.enum';
import { IMessage, IMessageOptionsProperties } from '../messages/IMessage';

// error default
export interface IErrors {
  readonly message: string | IMessage;
  readonly property: string;
}

interface IErrorBase {
  row: number;
  file?: string;
}

// error import
export interface IErrorsImport extends IErrorBase {
  errors: IErrors[];
}

export interface IValidationErrorImport extends IErrorBase {
  errors: ValidationError[];
}

export interface IErrorStatusBase {
  data?: Record<string, any>;
  error?: string;
  statusCode: number;
}

// error exception
export interface IErrorException {
  errors?: ValidationError[] | IValidationErrorImport[];
  errorType?: ERROR_TYPE;
  message: string;
  metadata?: Record<string, any>;
  properties?: IMessageOptionsProperties;
}

export interface IErrorHttpFilter {
  errors?: IErrors[] | IErrorsImport[];
  message: string | IMessage;
  metadata: IErrorHttpFilterMetadata;
}

// final error
export interface IErrorHttpFilterMetadata {
  languages: string[];
  path: string;
  requestId: string;
  timestamp: number;
  timezone: string;
  [key: string]: any;
}
