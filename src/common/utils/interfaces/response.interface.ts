import { HttpStatus } from '@nestjs/common';

/**
 * Response type of APIs that return a success/error/validation/paginated response
 */

export interface ISuccess {
	statusCode?: HttpStatus;
	message?: string;
	data?: any;
}
export interface ISuccessResponse {
	statusCode: HttpStatus;
	message: string;
	result?: any;
}
export interface ISessionSuccessResponse {
	responseBody: ISuccessResponse;
	sessionPayload: ISessionPayload;
}
export interface ISessionPayload {
	sessionKeys: string[];
	sessionValue: object;
}
export interface IError {
	statusCode?: HttpStatus;
	message?: string;
	error?: any;
}
export interface IErrorResponse {
	statusCode?: HttpStatus;
	message?: string;
	error?: any;
	validationErrors?: Array<IValidationErrors>;
}
export interface ISessionErrorResponse {
	sessionPayload?: ISessionPayload;
	responseBody: IErrorResponse;
}
export interface IValidationErrors {
	field: string;
	value: string | number | boolean | Record<string, unknown>;
	messages: Record<string, unknown>;
}
export interface IPaginatedResponse {
	data: Array<Record<string, unknown | never>>;
	totalRecords: number;
	currentPage: number;
	nextPage: number;
	prevPage: number;
	lastPage: number;
}
