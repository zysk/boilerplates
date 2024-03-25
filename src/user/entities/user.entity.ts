import { Column, Entity } from 'typeorm';
import { Master } from '../../common/base_entity/master';

@Entity('user')
export class User extends Master {
	@Column({ name: 'email', unique: true })
	email: string;

	@Column({ name: 'password' })
	password: string;
}
