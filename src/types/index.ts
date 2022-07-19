/* eslint-disable @typescript-eslint/no-empty-interface */
export interface IBody {}

export interface IParams {}

export interface IQuery{}

export interface IValidationObj {
  body?: IBody
  params?: IParams
  query?: IQuery
}