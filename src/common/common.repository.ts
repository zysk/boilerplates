import {
	DeepPartial,
	DeleteResult,
	FindManyOptions,
	FindOneOptions,
	FindOptionsWhere,
	Repository,
	UpdateResult
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ICommonRepository } from './utils/interfaces/common.interface';

/**
 * @class CommonRepository
 */
export class CommonRepository<T> implements ICommonRepository<T> {
	/**
	 * Repository of derived class type
	 */
	private repository: Repository<T>;

	/**
	 * @constructor CommonRepository
	 * @param repository
	 */
	constructor(repository: Repository<T>) {
		this.repository = repository;
	}

	/**
	 * @description Function to create and save a new record
	 * @param createDto Data to insert
	 * @returns
	 */
	async createRecord(createDto: DeepPartial<T>): Promise<T> {
		const record = this.repository.create(createDto);
		return this.repository.save(record);
	}

	/**
	 * @description Function to fetch one record
	 * @param criteria Conditions to apply
	 * @returns
	 */
	async fetchOneRecord(criteria: FindOneOptions<T>): Promise<T> {
		return this.repository.findOne(criteria);
	}

	/**
	 * @description Function to fetch all records
	 * @param criteria Conditions to apply
	 * @returns
	 */
	async fetchAllRecords(criteria: FindManyOptions<T>): Promise<Array<T>> {
		return this.repository.find(criteria);
	}

	/**
	 * @description Function to fetch all records with pagination
	 * @param criteria Conditions to apply
	 * @returns
	 */
	async fetchAllRecordsWithCount(criteria: any): Promise<any> {
		return this.repository.findAndCount(criteria);
	}

	/**
	 * @description Function to fetch count
	 * @param criteria Conditions to apply
	 * @returns
	 */
	async fetchCount(criteria: any): Promise<any> {
		return this.repository.count(criteria);
	}

	/**
	 * @description Function to update record(s)
	 * @param updateDto Data to update
	 * @param criteria Conditions to apply
	 * @returns
	 */
	async updateRecord(
		updateDto: QueryDeepPartialEntity<T>,
		criteria: FindOptionsWhere<T>
	): Promise<UpdateResult> {
		return this.repository.update(criteria, updateDto);
	}

	/**
	 * @description Function to soft delete record
	 * @param criteria Conditions to apply
	 * @returns
	 */
	async softDeleteRecord(
		criteria: FindOptionsWhere<T>
	): Promise<UpdateResult> {
		return this.repository.softDelete(criteria);
	}

	/**
	 * @description Function to delete record
	 * @param criteria Conditions to apply
	 * @returns
	 */
	async deleteRecord(criteria: FindOptionsWhere<T>): Promise<DeleteResult> {
		return this.repository.delete(criteria);
	}

	/**
	 * @description Function to add bulk records
	 * @param criteria Array of Data to insert
	 * @returns
	 */
	async createBulkRecords(createDtos: DeepPartial<T>[]): Promise<T[]> {
		return this.repository.save(createDtos);
	}
}
