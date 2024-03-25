import { Controller } from '@nestjs/common';
import {
	DeepPartial,
	FindOneOptions,
	FindManyOptions,
	FindOptionsWhere,
	UpdateResult,
	DeleteResult,
	FindOptionsOrder
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { PageOptions } from './utils/classes/page-options.class';
import { ICommonController } from './utils/interfaces/common.interface';
import { TCommonController } from './utils/types/types';

/**
 * @class CommonController
 */
@Controller()
export class CommonController<T> implements ICommonController<T> {
	/**
	 * Service of derived class type
	 */
	protected service: any;

	/**
	 * @constructor CommonController
	 * @param service
	 */
	constructor(service: any) {
		this.service = service;
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
	): Promise<TCommonController | T> {
		return this.service.createRecord(createDto, responseAsApi, responseMsg);
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
	): Promise<TCommonController | T> {
		return this.service.fetchOneRecord(
			criteria,
			responseAsApi,
			responseMsg
		);
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
	): Promise<TCommonController | Array<T>> {
		return this.service.fetchAllRecords(
			criteria,
			responseAsApi,
			responseMsg
		);
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
	): Promise<TCommonController | Array<T>> {
		return this.service.fetchAllRecordsWithPagination(
			criteria,
			responseAsApi,
			pageOptions
		);
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
	): Promise<TCommonController | UpdateResult> {
		return this.service.updateRecord(
			updateDto,
			criteria,
			responseAsApi,
			responseMsg
		);
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
	): Promise<TCommonController | UpdateResult> {
		return this.service.softDeleteRecord(
			criteria,
			responseAsApi,
			responseMsg
		);
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
	): Promise<TCommonController | DeleteResult> {
		return this.service.deleteRecord(criteria, responseAsApi, responseMsg);
	}
}
