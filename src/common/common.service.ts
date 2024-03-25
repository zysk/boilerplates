import { HttpStatus } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import {
	DeepPartial,
	DeleteResult,
	FindManyOptions,
	FindOneOptions,
	FindOptionsOrder,
	FindOptionsWhere,
	UpdateResult
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { PageOptions } from './utils/classes/page-options.class';
import { QueryOptions } from './utils/classes/query-options.class';
import { ICommonService } from './utils/interfaces/common.interface';
import {
	ISuccess,
	ISuccessResponse,
	IError,
	IErrorResponse,
	IValidationErrors,
	IPaginatedResponse,
	ISessionSuccessResponse,
	ISessionErrorResponse
} from './utils/interfaces/response.interface';
import { TCommonService } from './utils/types/types';
import { ErrorMessage, ResponseMessage } from './utils/consts/variables.const';

/**
 * @class CommonService
 */
export class CommonService<T> implements ICommonService<T> {
	/**
	 * Repository of derived class type
	 */
	protected repository: any;

	/**
	 * @constructor CommonService
	 * @param repository
	 */
	constructor(repository: any) {
		this.repository = repository;
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
		// try {
		const dataToSave = await this.beforeCreate(createDto);
		let result = await this.repository.createRecord(dataToSave);
		await this.afterCreate(result);
		if (responseAsApi) {
			result = {
				statusCode: HttpStatus.CREATED,
				message: responseMsg
			};
			return this.handleSuccess(result);
		}
		return result;
		// } catch (error) {
		//   return this.handleError(error);
		// }
	}

	/**
	 * @description Function to create new record(s)
	 * @param createDto Data to insert
	 * @param responseAsApi Response to be returned as final/operational
	 * @param responseMsg Response message (required if `responseAsApi` is true)
	 * @returns
	 */
	async createBulkRecords(
		createDto: DeepPartial<T>,
		responseAsApi = false,
		responseMsg?: string
	): Promise<TCommonService | T> {
		// try {
		const dataToSave = await this.beforeCreate(createDto);
		let result = await this.repository.createBulkRecords(dataToSave);
		await this.afterCreate(result);
		if (responseAsApi) {
			result = {
				statusCode: HttpStatus.CREATED,
				message: responseMsg
			};
			return this.handleSuccess(result);
		}
		return result;
		// } catch (error) {
		//   return this.handleError(error);
		// }
	}

	/**
	 * @description Function to fetch one record
	 * @param criteria Conditions to apply
	 * @param responseAsApi Response to be returned as final/operational
	 * @param responseMsg Response message (required if `responseAsApi` is true)
	 * @returns
	 */
	async fetchOneRecord(
		criteria: FindOptionsWhere<T> | FindOneOptions<T> | FindOptionsOrder<T>,
		responseAsApi = false,
		responseMsg?: string
	): Promise<TCommonService | T> {
		// try {
		let result = await this.repository.fetchOneRecord(criteria);
		if (responseAsApi) {
			result = { data: { ...result }, message: responseMsg };
			return this.handleSuccess(result);
		}
		return result;
		// } catch (error) {
		//   return this.handleError(error);
		// }
	}

	/**
	 * @description Function to fetch all records
	 * @param criteria Conditions to apply
	 * @param responseAsApi Response to be returned as final/operational
	 * @param responseMsg Response message (required if `responseAsApi` is true)
	 * @returns
	 */
	async fetchAllRecords(
		criteria:
			| FindOptionsWhere<T>
			| FindManyOptions<T>
			| FindOptionsOrder<T>,
		responseAsApi = false,
		responseMsg?: string
	): Promise<TCommonService | Array<T>> {
		// try {
		let result = await this.repository.fetchAllRecords(criteria);
		if (responseAsApi) {
			result = { data: [...result], message: responseMsg };
			return this.handleSuccess(result);
		}
		return result;
		// } catch (error) {
		//   return this.handleError(error);
		// }
	}

	/**
	 * @description Function to fetch all records with pagination
	 * @param criteria Conditions to apply
	 * @param responseAsApi Response to be returned as final/operational
	 * @param pageOptions `take` and `skip` for pagination
	 * @returns
	 */
	async fetchAllRecordsWithPagination(
		criteria:
			| FindOptionsWhere<T>
			| FindOneOptions<T>
			| FindManyOptions<T>
			| FindOptionsOrder<T>,
		responseAsApi = false,
		pageOptions?: PageOptions
	): Promise<TCommonService | Array<T>> {
		// try {
		if (!isEmpty(pageOptions)) {
			const { skip, take } = this.queryOptions(pageOptions);
			criteria = {
				...criteria,
				skip,
				take
			};
		}
		const [result, totalCount] =
			await this.repository.fetchAllRecordsWithCount(criteria);
		const paginatedResult = this.paginate(result, totalCount, pageOptions);
		return responseAsApi
			? this.handleSuccess(paginatedResult)
			: { data: result, totalCount };
		// } catch (error) {
		//   return this.handleError(error);
		// }
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
		criteria: FindOptionsWhere<T> | FindOptionsOrder<T>,
		responseAsApi = false,
		responseMsg?: string
	): Promise<TCommonService | UpdateResult> {
		// try {
		const dataToUpdate = await this.beforeUpdate(updateDto);
		let result = this.repository.updateRecord(dataToUpdate, criteria);
		await this.afterUpdate(updateDto);
		if (responseAsApi) {
			result = { data: { ...result }, message: responseMsg };
			return this.handleSuccess(result);
		}
		return result;
		// } catch (error) {
		//   return this.handleError(error);
		// }
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
		criteria?: FindOptionsWhere<T> | FindOptionsOrder<T>,
		responseMsg?: string
	): Promise<TCommonService | UpdateResult> {
		// try {
		let result = this.repository.softDeleteRecord(criteria, responseAsApi);
		if (responseAsApi) {
			result = { data: { ...result }, message: responseMsg };
			return this.handleSuccess(result);
		}
		return result;
		// } catch (error) {
		//   return this.handleError(error);
		// }
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
		criteria?: FindOptionsWhere<T> | FindOptionsOrder<T>,
		responseMsg?: string
	): Promise<TCommonService | DeleteResult> {
		// try {
		let result = this.repository.deleteRecord(criteria, responseAsApi);
		if (responseAsApi) {
			result = { data: { ...result }, message: responseMsg };
			return this.handleSuccess(result);
		}
		return result;
		// } catch (error) {
		//   return this.handleError(error);
		// }
	}

	/**
	 * @description Function to be called before save
	 * @param params Params
	 * @returns
	 */
	async beforeCreate(params?: any): Promise<any> {
		return params;
	}

	/**
	 * @description Function to be called after save
	 * @param params Params
	 * @returns
	 */
	async afterCreate(params?: any): Promise<any> {
		return params;
	}

	/**
	 * @description Function to be called before save
	 * @param params Params
	 * @returns
	 */
	async beforeUpdate(params?: any): Promise<any> {
		return params;
	}

	/**
	 * @description Function to be called after save
	 * @param params Params
	 * @returns
	 */
	async afterUpdate(params?: any): Promise<any> {
		return params;
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
		};
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
		};
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
		};
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
		};
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
		validationErrors?: Array<IValidationErrors>
	): IErrorResponse {
		return {
			...{
				statusCode: statusCode || HttpStatus.FAILED_DEPENDENCY,
				message: message || ErrorMessage.SOMETHING_WENT_WRONG,
				validationErrors: validationErrors
			}
		};
	}

	/**
	 * @description Transform pageOptions to the values needed for executing queries
	 * @param pageOptions Current page and records per page
	 * @returns
	 */
	queryOptions(pageOptions?: PageOptions): QueryOptions {
		const page = pageOptions?.page || 1;
		const take = pageOptions?.take || 10;
		return {
			skip: Number.isNaN((page - 1) * take) ? 0 : (page - 1) * take,
			take
		};
	}

	/**
	 * @description Paginated data from database
	 * @param records Records fetched
	 * @param totalRecords Total records present in DB
	 * @param pageOptions Current page and records per page
	 * @returns
	 */
	paginate(
		records: Array<Record<string, unknown | never>>,
		totalRecords: number,
		pageOptions?: PageOptions
	): IPaginatedResponse {
		const page = pageOptions?.page || 1;
		const take = pageOptions?.take || 10;
		// Last page
		const lastPage = Math.ceil(totalRecords / take);
		// Next page
		const nextPage = page + 1 > lastPage ? null : page + 1;
		// Previous page
		const prevPage = page - 1 < 1 ? null : page - 1;
		return {
			data: records,
			totalRecords,
			currentPage: page,
			nextPage,
			prevPage,
			lastPage
		};
	}

	/**
	 * @description Group By on JSON
	 * @param arr Operation to be performed on the array
	 * @param property Based on what groupBy should be done
	 * @returns
	 */
	async groupBy(arr: Array<any>, property: string): Promise<typeof arr> {
		return arr.reduce((acc, obj) => {
			const key = obj[property];
			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(obj);
			return acc;
		}, {});
	}
}
