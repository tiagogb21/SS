import { ENUM_HELPER_DATE_DIFF } from 'src/@types/enums/helper/date-diff.enum';

import { ENUM_HELPER_DATE_FORMAT } from 'src/@types/enums/helper/date-format.enum';

import { ENUM_HELPER_FILE_TYPE } from 'src/@types/enums/helper/file.enum';

export interface IHelperArrayRemove<T> {
  removed: T[];
  arrays: T[];
}

export interface IHelperJwtVerifyOptions {
  audience: string;
  issuer: string;
  subject: string;
  secretKey: string;
}

export interface IHelperJwtOptions extends IHelperJwtVerifyOptions {
  expiredIn: number | string;
  notBefore?: number | string;
}

export interface IHelperStringRandomOptions {
  upperCase?: boolean;
  safe?: boolean;
  prefix?: string;
}

export interface IHelperGeoCurrent {
  latitude: number;
  longitude: number;
}

export interface IHelperGeoRules extends IHelperGeoCurrent {
  radiusInMeters: number;
}

export interface IHelperDateStartAndEnd {
  month?: number;
  year?: number;
}

export interface IHelperDateStartAndEndDate {
  startDate: Date;
  endDate: Date;
}

export interface IHelperDateExtractDate {
  date: Date;
  day: string;
  month: string;
  year: string;
}

export interface IHelperDateOptionsDiff {
  format?: ENUM_HELPER_DATE_DIFF;
}

export interface IHelperDateOptionsCreate {
  startOfDay?: boolean;
}

export interface IHelperDateOptionsFormat {
  format?: ENUM_HELPER_DATE_FORMAT | string;
}

export interface IHelperDateOptionsForward {
  fromDate?: Date;
}

export type IHelperDateOptionsBackward = IHelperDateOptionsForward;

export interface IHelperDateOptionsRoundDown {
  hour: boolean;
  minute: boolean;
  second: boolean;
}

export type IHelperFileRows = Record<string, string | number | Date>;

export interface IHelperFileWriteExcelOptions {
  password?: string;
  type?: ENUM_HELPER_FILE_TYPE;
}

export interface IHelperFileCreateExcelWorkbookOptions {
  sheetName?: string;
}

export interface IHelperFileReadExcelOptions {
  sheet?: string | number;
  password?: string;
}
