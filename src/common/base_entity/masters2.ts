import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export class Master2 {
	/**
	 * Column : createdAt
	 */
	@CreateDateColumn({
		name: 'created_at',
		type: 'timestamptz',
		select: false
	})
	createdAt: Date;

	/**
	 * Column : updatedAt
	 */
	@UpdateDateColumn({
		name: 'updated_at',
		type: 'timestamptz',
		select: false
	})
	updatedAt: Date;

	/**
	 * Column : deletedAt
	 */
	@DeleteDateColumn({
		name: 'deleted_at',
		type: 'timestamptz',
		select: false
	})
	deletedAt: Date;
}
