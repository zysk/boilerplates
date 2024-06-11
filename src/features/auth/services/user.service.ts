import { Injectable } from '@nestjs/common'
import { CommonService } from '../../../common/common.service'
import { User } from '../entities/user.entity'
import { UserRepository } from '../repositories/user.repository'

@Injectable()
export class UserService extends CommonService<User> {
	constructor(private readonly userRepository: UserRepository) {
		super(userRepository)
	}
}
