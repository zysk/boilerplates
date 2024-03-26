import { Column, Entity } from 'typeorm';
import { Common } from '../../common/entities/common';

@Entity('user')
export class User extends Common {
	@Column({ name: 'email', unique: true })
	email: string;

	@Column({ name: 'password' })
	password: string;
}
