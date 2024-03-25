import { Injectable } from '@nestjs/common';
import { CommonRepository } from '../common/common.repository';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends CommonRepository<User> {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {
		super(userRepository);
	}
}
