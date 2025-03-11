import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common'
import { UserService } from './services/user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { CommonController } from '../../common/common.controller'
import { User } from './entities/user.entity'
import { ApiDocUser } from '../../shared/swagger/user-doc.decorator'
import { IResponse } from '../../common/types/types'
import { JwtAuthGuard } from './guard/jwt-auth.guard'
import { AbilitiesGuard } from './guard/abilities.guard'
import { CheckAbilities } from './decorator/abilities.decorator'
import { Action } from './guard/casl-ability.factory'

@Controller('user')
export class UserController extends CommonController<User> {
	constructor(private readonly userService: UserService) {
		super(userService)
	}

	/**
	 * @description Example post query
	 * @param createUserDto
	 * @returns
	 * The decorator is the "what" (what permission is needed)
	 * The guard is the "how" (how to check if the user has that permission)
	 */
	@Post()
	@ApiDocUser()
	@UseGuards(JwtAuthGuard, AbilitiesGuard)
	@CheckAbilities({ action: Action.Create, subject: 'all' })
	create(@Body() createUserDto: CreateUserDto): Promise<IResponse> {
		return this.createRecord(createUserDto, true)
	}

	/**
	 * @description Example get query
	 * @returns
	 */
	@Get()
	@ApiDocUser()
	@UseGuards(JwtAuthGuard)
	get(): Promise<IResponse> {
		return this.fetchAllRecords({}, true)
	}
}
