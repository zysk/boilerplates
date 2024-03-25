import {
	IError,
	IErrorResponse,
	IPaginatedResponse,
	ISuccess,
	ISuccessResponse
} from './response.interface';
import { DeleteResult, UpdateResult } from 'typeorm';
import { TCommonController, TCommonService } from '../types/types';
import { QueryOptions } from '../classes/query-options.class';
import { PageOptions } from '../classes/page-options.class';

export interface ICommonController<T> {
	createRecord(
		createDto: unknown,
		responseAsApi: boolean,
		responseMsg?: string
	): Promise<TCommonController | T>;
	fetchOneRecord(
		criteria: any,
		responseAsApi: boolean,
		responseMsg?: string
	): Promise<TCommonController | T>;
	fetchAllRecords(
		criteria: any,
		responseAsApi: boolean,
		responseMsg?: string
	): Promise<TCommonController | Array<T>>;
	fetchAllRecordsWithPagination(
		criteria: any,
		responseAsApi: boolean
	): Promise<TCommonController | T | Array<T>>;
	updateRecord(
		updateDto: unknown,
		criteria: any,
		responseAsApi: boolean,
		responseMsg?: string
	): Promise<TCommonController | UpdateResult>;
	softDeleteRecord(
		responseAsApi: boolean,
		criteria: any,
		responseMsg?: string
	): Promise<TCommonController | UpdateResult>;
	deleteRecord(
		responseAsApi: boolean,
		criteria: any,
		responseMsg?: string
	): Promise<TCommonController | DeleteResult>;
}
export interface ICommonService<T> {
	createRecord(
		createDto: unknown,
		responseAsApi: boolean,
		responseMsg?: string
	): Promise<TCommonService | T>;
	fetchOneRecord(
		criteria: any,
		responseAsApi: boolean,
		responseMsg?: string
	): Promise<TCommonService | T>;
	fetchAllRecords(
		criteria: any,
		responseAsApi: boolean,
		responseMsg?: string
	): Promise<TCommonService | Array<T>>;
	fetchAllRecordsWithPagination(
		criteria: any,
		responseAsApi: boolean
	): Promise<TCommonService | T | Array<T>>;
	updateRecord(
		updateDto: unknown,
		criteria: any,
		responseAsApi: boolean,
		responseMsg?: string
	): Promise<TCommonService | UpdateResult>;
	softDeleteRecord(
		responseAsApi: boolean,
		criteria: any,
		responseMsg?: string
	): Promise<TCommonService | UpdateResult>;
	deleteRecord(
		responseAsApi: boolean,
		criteria: any,
		responseMsg?: string
	): Promise<TCommonService | DeleteResult>;
	handleSuccess(successRes?: ISuccess): ISuccessResponse;
	handleError(errorRes?: IError): IErrorResponse;
	queryOptions(pageOptions: PageOptions): QueryOptions;
	paginate(
		records: Array<Record<string, unknown | never>>,
		totalRecords: number,
		pageOptions: PageOptions
	): IPaginatedResponse;
	groupBy(arr: Array<any>, property: string): Promise<typeof arr>;
}
export interface ICommonRepository<T> {
	createRecord(createDto: any): Promise<T | Array<T> | unknown>;
	fetchOneRecord(criteria: any): Promise<T | Array<T> | unknown>;
	fetchAllRecords(criteria: any): Promise<T | Array<T> | any>;
	fetchAllRecordsWithCount(criteria: any): Promise<T | Array<T> | unknown>;
	updateRecord(
		updateDto: any,
		criteria: any
	): Promise<T | Array<T> | unknown>;
	softDeleteRecord(criteria: any): Promise<T | Array<T> | unknown>;
	deleteRecord(criteria: any): Promise<T | Array<T> | unknown>;
}
