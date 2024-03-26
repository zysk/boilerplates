import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Common2 } from './common2';

export class Common extends Common2 {
	/**
	 * Column : id
	 */
	@PrimaryGeneratedColumn({ name: 'id' })
	id: number;

	/**
	 * Column : name
	 */
	@Column({ name: 'name', nullable: true })
	name: string;

	/**
	 * Column : active
	 */
	@Column({ name: 'active', type: 'boolean', default: true })
	active: boolean;
}
