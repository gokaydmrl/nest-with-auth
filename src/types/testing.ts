import type { Response } from 'express';

export interface ITest {
  success: boolean;
  data: any;
}
export interface IData {
  success: boolean;
  data: any;
}
export type TRes = Response<any, IData>;
