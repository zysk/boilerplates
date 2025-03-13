import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { Role } from './role.entity'

@Entity('user')
export class User {
	@PrimaryGeneratedColumn('uuid')
	public id?: string

	@Column({ name: 'email', unique: true })
	email: string

	@Column({ name: 'password' })
	password: string

	@ManyToOne(() => Role, (role) => role.users, { eager: true })
	@JoinColumn({ name: 'role_id' })
	role: Role

	/**Audit Columns**/
	@CreateDateColumn({
		name: 'created_at',
		type: 'timestamptz',
		select: false
	})
	public createdAt?: Date

	@UpdateDateColumn({
		name: 'updated_at',
		type: 'timestamptz',
		select: false
	})
	public updatedAt?: Date

	@DeleteDateColumn({
		name: 'deleted_at',
		type: 'timestamptz',
		select: false
	})
	public deletedAt?: Date
}
