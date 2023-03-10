import { Response } from 'express';
import { ClassConstructor } from 'class-transformer';

import { ENUM_HELPER_FILE_TYPE } from 'src/@types/enums/helper/file.enum';
import { IHelperFileRows } from '../service/IService';
import { IMessageOptionsProperties } from '../messages/IMessage';

export interface IResponseMetadata {
  statusCode?: number;
  message?: string;
  messageProperties?: IMessageOptionsProperties;
  [key: string]: any;
}

export interface IResponseOptions<T> {
  serialization?: ClassConstructor<T>;
  messageProperties?: IMessageOptionsProperties;
}

export type IResponsePagingOptions<T> = IResponseOptions<T>;

export interface IResponseExcelOptions<T> extends IResponseOptions<T> {
  type?: ENUM_HELPER_FILE_TYPE;
}

export type IResponseExcel = IHelperFileRows[];

export interface IResponse {
  _metadata?: IResponseMetadata;
  [key: string]: any;
}

export interface IResponsePaging<T = Record<string, any>> {
  totalData: number;
  totalPage?: number;
  currentPage?: number;
  perPage?: number;
  _availableSearch?: string[];
  _availableSort?: string[];
  _metadata?: IResponseMetadata;
  data: T[];
}

export interface IResponseCustom extends Response {
  body: string;
}
