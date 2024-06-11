import {
	IErrorResponse,
	ISuccessResponse
} from '../interfaces/response.interface'

export type TCommonController = ISuccessResponse | IErrorResponse | any
export type TCommonService = ISuccessResponse | IErrorResponse | unknown
export type IResponse = ISuccessResponse | IErrorResponse
