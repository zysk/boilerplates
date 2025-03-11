import { Common } from 'src/common/entities/common'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { RoleEnum } from '../enum/role.enum'
import { User } from './user.entity'

@Entity('role')
export class Role extends Common {
	@PrimaryGeneratedColumn({ name: 'id' })
	id?: number

	@Column({
		type: 'enum',
		enum: RoleEnum
	})
	name: RoleEnum

	@OneToMany(() => User, (user) => user.role)
	users?: User[]
}
