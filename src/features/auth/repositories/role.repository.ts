import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CommonRepository } from '../../../common/common.repository'
import { Role } from '../entities/role.entity'

@Injectable()
export class RoleRepository extends CommonRepository<Role> {
	constructor(
		@InjectRepository(Role)
		private readonly roleRepository: Repository<Role>
	) {
		super(roleRepository)
	}
}
