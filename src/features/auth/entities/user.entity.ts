import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Common } from '../../../common/entities/common'
import { Role } from './role.entity'

@Entity('user')
export class User extends Common {
	@Column({ name: 'email', unique: true })
	email: string

	@Column({ name: 'password' })
	password: string

	@ManyToOne(() => Role, (role) => role.users, { eager: true })
	@JoinColumn({ name: 'role_id' })
	role: Role
}
