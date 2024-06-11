import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CommonRepository } from '../../../common/common.repository'
import { User } from '../entities/user.entity'

@Injectable()
export class UserRepository extends CommonRepository<User> {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {
		super(userRepository)
	}
}
