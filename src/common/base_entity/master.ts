import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Master2 } from './masters2';

export class Master extends Master2 {
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
