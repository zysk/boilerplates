import {
	IError,
	IErrorResponse,
	IPaginatedResponse,
	ISuccess,
	ISuccessResponse
} from './response.interface'
import {
	DeepPartial,
	DeleteResult,
	FindManyOptions,
	FindOneOptions,
	FindOptionsWhere,
	UpdateResult
} from 'typeorm'
import { TCommonController, TCommonService } from '../types/types'
import { PageOptions } from 'src/common/dto/page.dto'
import { QueryOptions } from 'src/common/dto/query.dto'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

/**
 * @interface ICommonController
 * Generic interface for common controller operations.
 * @template T - The entity type.
 */
export interface ICommonController<T> {
	createRecord(
		createDto: DeepPartial<T>,
		responseAsApi: boolean,
		responseMsg?: string
	): Promise<TCommonController | T>
	fetchOneRecord(
		criteria: FindOneOptions<T>,
		responseAsApi: boolean,
		responseMsg?: string
	): Promise<TCommonController | T>
	fetchAllRecords(
		criteria: FindManyOptions<T>,
		responseAsApi: boolean,
		responseMsg?: string
	): Promise<TCommonController | T[]>
	fetchAllRecordsWithPagination(
		criteria: FindOneOptions<T>,
		responseAsApi: boolean
	): Promise<TCommonController | T | T[]>
	updateRecord(
		updateDto: QueryDeepPartialEntity<T>,
		criteria: FindOptionsWhere<T>,
		responseAsApi: boolean,
		responseMsg?: string
	): Promise<TCommonController | UpdateResult>
	softDeleteRecord(
		responseAsApi: boolean,
		criteria: FindOptionsWhere<T>,
		responseMsg?: string
	): Promise<TCommonController | UpdateResult>
	deleteRecord(
		responseAsApi: boolean,
		criteria: FindOptionsWhere<T>,
		responseMsg?: string
	): Promise<TCommonController | DeleteResult>
}

/**
 * @interface ICommonService
 * Generic interface for common service operations.
 * @template T - The entity type.
 */
export interface ICommonService<T> {
	createRecord(
		createDto: DeepPartial<T>,
		responseAsApi: boolean,
		responseMsg?: string
	): Promise<TCommonService | T | T[]>
	createBulkRecords(
		createDto: DeepPartial<T>[],
		responseAsApi: boolean,
		responseMsg?: string
	): Promise<TCommonService | T>
	fetchOneRecord(
		criteria: FindOneOptions<T>,
		responseAsApi: boolean,
		responseMsg?: string
	): Promise<TCommonService | T>
	fetchAllRecords(
		criteria: FindOneOptions<T>,
		responseAsApi: boolean,
		responseMsg?: string
	): Promise<TCommonService | T[]>
	fetchAllRecordsWithPagination(
		criteria: FindOneOptions<T>,
		responseAsApi: boolean
	): Promise<TCommonService | T | T[]>
	updateRecord(
		updateDto: QueryDeepPartialEntity<T>,
		criteria: FindOptionsWhere<T>,
		responseAsApi: boolean,
		responseMsg?: string
	): Promise<TCommonService | UpdateResult>
	softDeleteRecord(
		responseAsApi: boolean,
		criteria: FindOptionsWhere<T>,
		responseMsg?: string
	): Promise<TCommonService | UpdateResult>
	deleteRecord(
		responseAsApi: boolean,
		criteria: FindOptionsWhere<T>,
		responseMsg?: string
	): Promise<TCommonService | DeleteResult>
	handleSuccess(successRes?: ISuccess): ISuccessResponse
	handleError(errorRes?: IError): IErrorResponse
	queryOptions(pageOptions: PageOptions): QueryOptions
	paginate(
		records: Record<string, unknown | never>[],
		totalRecords: number,
		pageOptions: PageOptions
	): IPaginatedResponse
	groupBy(arr: any[], property: string): Promise<typeof arr>
}

/**
 * @interface ICommonRepository
 * Generic interface for common repository operations.
 * @template T - The entity type.
 */
export interface ICommonRepository<T> {
	createRecord(createDto: DeepPartial<T>): Promise<T | T[]>
	fetchOneRecord(criteria: FindOneOptions<T>): Promise<T | null>
	fetchAllRecords(criteria: FindManyOptions<T>): Promise<T[]>
	fetchAllRecordsWithCount(
		criteria: FindManyOptions<T>
	): Promise<[T[], number]>
	fetchCount(criteria: FindManyOptions<T>): Promise<number>
	updateRecord(
		updateDto: QueryDeepPartialEntity<T>,
		criteria: FindOptionsWhere<T>
	): Promise<UpdateResult>
	softDeleteRecord(criteria: FindOptionsWhere<T>): Promise<UpdateResult>
	deleteRecord(criteria: FindOptionsWhere<T>): Promise<DeleteResult>
	createBulkRecords(createDto: DeepPartial<T>[]): Promise<T[]>
}
