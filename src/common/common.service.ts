import { HttpStatus } from '@nestjs/common'
import { isEmpty } from 'class-validator'
import {
	DeepPartial,
	DeleteResult,
	FindManyOptions,
	FindOneOptions,
	FindOptionsWhere,
	UpdateResult
} from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { PageOptions } from './dto/page.dto'
import { QueryOptions } from './dto/query.dto'
import { ICommonService } from './interfaces/common.interface'
import {
	ISuccess,
	ISuccessResponse,
	IError,
	IErrorResponse,
	IValidationErrors,
	IPaginatedResponse,
	ISessionSuccessResponse,
	ISessionErrorResponse
} from './interfaces/response.interface'
import { TCommonService } from './types/types'
import { ErrorMessage, ResponseMessage } from './utils/consts/variables.const'

/**
 * @class CommonService
 */
export class CommonService<T = any> implements ICommonService<T> {
	/**
	 * Repository of derived class type
	 */
	protected repository

	/**
	 * @constructor CommonService
	 * @param repository
	 */
	constructor(repository) {
		this.repository = repository
	}

	/**
	 * @description Function to create new record(s)
	 * @param createDto Data to insert
	 * @param responseAsApi Response to be returned as final/operational
	 * @param responseMsg Response message (required if `responseAsApi` is true)
	 * @returns
	 */
	async createRecord(
		createDto: DeepPartial<T>,
		responseAsApi = false,
		responseMsg?: string
	): Promise<TCommonService | T> {
		let result = await this.repository.createRecord(createDto)
		if (responseAsApi) {
			result = {
				statusCode: HttpStatus.CREATED,
				message: responseMsg
			}
			return this.handleSuccess(result)
		}
		return result
	}

	/**
	 * @description Function to create new record(s)
	 * @param createDto Data to insert
	 * @param responseAsApi Response to be returned as final/operational
	 * @param responseMsg Response message (required if `responseAsApi` is true)
	 * @returns
	 */
	async createBulkRecords(
		createDto: DeepPartial<T>[],
		responseAsApi = false,
		responseMsg?: string
	): Promise<TCommonService | T[]> {
		let result = await this.repository.createBulkRecords(createDto)
		if (responseAsApi) {
			result = {
				statusCode: HttpStatus.CREATED,
				message: responseMsg
			}
			return this.handleSuccess(result)
		}
		return result
	}

	/**
	 * @description Function to fetch one record
	 * @param criteria Conditions to apply
	 * @param responseAsApi Response to be returned as final/operational
	 * @param responseMsg Response message (required if `responseAsApi` is true)
	 * @returns
	 */
	async fetchOneRecord(
		criteria: FindOneOptions<T>,
		responseAsApi = false,
		responseMsg?: string
	): Promise<TCommonService | T> {
		let result = await this.repository.fetchOneRecord(criteria)
		if (responseAsApi) {
			result = { data: { ...result }, message: responseMsg }
			return this.handleSuccess(result)
		}
		return result
	}

	/**
	 * @description Function to fetch all records
	 * @param criteria Conditions to apply
	 * @param responseAsApi Response to be returned as final/operational
	 * @param responseMsg Response message (required if `responseAsApi` is true)
	 * @returns
	 */
	async fetchAllRecords(
		criteria: FindManyOptions<T>,
		responseAsApi = false,
		responseMsg?: string
	): Promise<TCommonService | T[]> {
		let result = await this.repository.fetchAllRecords(criteria)
		if (responseAsApi) {
			result = { data: [...result], message: responseMsg }
			return this.handleSuccess(result)
		}
		return result
	}

	/**
	 * @description Function to fetch all records with pagination
	 * @param criteria Conditions to apply
	 * @param responseAsApi Response to be returned as final/operational
	 * @param pageOptions `take` and `skip` for pagination
	 * @returns
	 */
	async fetchAllRecordsWithPagination(
		criteria: FindManyOptions<T>,
		responseAsApi = false,
		pageOptions?: PageOptions
	): Promise<TCommonService | T[]> {
		if (!isEmpty(pageOptions)) {
			const { skip, take } = this.queryOptions(pageOptions)
			criteria = {
				...criteria,
				skip,
				take
			}
		}
		const [result, totalCount] =
			await this.repository.fetchAllRecordsWithCount(criteria)
		const paginatedResult = this.paginate(result, totalCount, pageOptions)
		return responseAsApi
			? this.handleSuccess(paginatedResult)
			: { data: result, totalCount }
	}

	/**
	 * @description Function to update record(s)
	 * @param updateDto Data to update
	 * @param criteria Conditions to apply
	 * @param responseAsApi Response to be returned as final/operational
	 * @param responseMsg Response message (required if `responseAsApi` is true)
	 * @returns
	 */
	async updateRecord(
		updateDto: QueryDeepPartialEntity<T>,
		criteria: FindOptionsWhere<T>,
		responseAsApi = false,
		responseMsg?: string
	): Promise<TCommonService | UpdateResult> {
		let result = this.repository.updateRecord(updateDto, criteria)
		if (responseAsApi) {
			result = { data: { ...result }, message: responseMsg }
			return this.handleSuccess(result)
		}
		return result
	}

	/**
	 * @description Function to soft delete record
	 * @param responseAsApi Response to be returned as final/operational
	 * @param criteria Conditions to apply
	 * @param responseMsg Response message (required if `responseAsApi` is true)
	 * @returns
	 */
	async softDeleteRecord(
		responseAsApi = false,
		criteria?: FindOptionsWhere<T>,
		responseMsg?: string
	): Promise<TCommonService | UpdateResult> {
		let result = this.repository.softDeleteRecord(criteria, responseAsApi)
		if (responseAsApi) {
			result = { data: { ...result }, message: responseMsg }
			return this.handleSuccess(result)
		}
		return result
	}

	/**
	 * @description Function to delete record
	 * @param responseAsApi Response to be returned as final/operational
	 * @param criteria Conditions to apply
	 * @param responseMsg Response message (required if `responseAsApi` is true)
	 * @returns
	 */
	async deleteRecord(
		responseAsApi = false,
		criteria?: FindOptionsWhere<T>,
		responseMsg?: string
	): Promise<TCommonService | DeleteResult> {
		let result = this.repository.deleteRecord(criteria, responseAsApi)
		if (responseAsApi) {
			result = { data: { ...result }, message: responseMsg }
			return this.handleSuccess(result)
		}
		return result
	}

	/**
	 * @description Function to handle success response
	 * @param successRes
	 * @returns
	 */
	handleSuccess(successRes?: ISuccess): ISuccessResponse {
		return {
			statusCode: successRes?.statusCode || HttpStatus.OK,
			message: successRes?.message || ResponseMessage.QUERY_SUCCESS,
			result: successRes?.data || []
		}
	}

	/**
	 * @description Function to handle error response
	 * @param errorRes
	 * @returns
	 */
	handleError(errorRes?: IError): IErrorResponse {
		return {
			...{
				statusCode:
					errorRes?.statusCode || HttpStatus.FAILED_DEPENDENCY,
				message: errorRes?.message || ErrorMessage.SOMETHING_WENT_WRONG
				// error: errorRes,
			}
		}
	}

	/**
	 * @description Function to handle success response with session
	 * @param session
	 * @param successRes
	 * @returns
	 */
	handleSuccessWithSession(
		session: object,
		successRes?: ISuccess
	): ISessionSuccessResponse {
		return {
			sessionPayload: {
				sessionKeys: Object.keys(session),
				sessionValue: session
			},
			responseBody: this.handleSuccess(successRes)
		}
	}

	/**
	 * @description Function to handle error response with session
	 * @param session
	 * @param errorRes
	 * @returns
	 */
	handleErrorWithSession(
		session: object,
		errorRes?: IError
	): ISessionErrorResponse {
		return {
			sessionPayload: {
				sessionKeys: Object.keys(session),
				sessionValue: session
			},
			responseBody: this.handleError(errorRes)
		}
	}

	/**
	 * @description Function to handle validation error response
	 * @param message
	 * @param statusCode
	 * @param validationErrors
	 * @returns
	 */
	static handleValidationError(
		message: string,
		statusCode?: HttpStatus,
		validationErrors?: IValidationErrors[]
	): IErrorResponse {
		return {
			...{
				statusCode: statusCode || HttpStatus.FAILED_DEPENDENCY,
				message: message || ErrorMessage.SOMETHING_WENT_WRONG,
				validationErrors: validationErrors
			}
		}
	}

	/**
	 * @description Transform pageOptions to the values needed for executing queries
	 * @param pageOptions Current page and records per page
	 * @returns
	 */
	queryOptions(pageOptions?: PageOptions): QueryOptions {
		const page = pageOptions?.page || 1
		const take = pageOptions?.take || 10
		return {
			skip: Number.isNaN((page - 1) * take) ? 0 : (page - 1) * take,
			take
		}
	}

	/**
	 * @description Paginated data from database
	 * @param records Records fetched
	 * @param totalRecords Total records present in DB
	 * @param pageOptions Current page and records per page
	 * @returns
	 */
	paginate(
		records: Record<string, unknown | never>[],
		totalRecords: number,
		pageOptions?: PageOptions
	): IPaginatedResponse {
		const page = pageOptions?.page || 1
		const take = pageOptions?.take || 10
		// Last page
		const lastPage = Math.ceil(totalRecords / take)
		// Next page
		const nextPage = page + 1 > lastPage ? null : page + 1
		// Previous page
		const prevPage = page - 1 < 1 ? null : page - 1
		return {
			data: records,
			totalRecords,
			currentPage: page,
			nextPage,
			prevPage,
			lastPage
		}
	}

	/**
	 * @description Group By on JSON
	 * @param arr Operation to be performed on the array
	 * @param property Based on what groupBy should be done
	 * @returns
	 */
	async groupBy(arr: any[], property: string): Promise<typeof arr> {
		return arr.reduce((acc, obj) => {
			const key = obj[property]
			if (!acc[key]) {
				acc[key] = []
			}
			acc[key].push(obj)
			return acc
		}, {})
	}
}
