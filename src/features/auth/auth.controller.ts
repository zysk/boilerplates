import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common'
import { UserService } from './services/user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { CommonController } from '../../common/common.controller'
import { User } from './entities/user.entity'
import { ApiDocUser } from '../../shared/swagger/user-doc.decorator'
import { IResponse } from '../../common/utils/types/types'
import { JwtAuthGuard } from './guard/jwt-auth.guard'

@Controller('user')
export class UserController extends CommonController<User> {
	constructor(private readonly userService: UserService) {
		super(userService)
	}

	/**
	 * @description Example post query
	 * @param createUserDto
	 * @returns
	 */
	@Post()
	@ApiDocUser()
	@UseGuards(JwtAuthGuard)
	create(@Body() createUserDto: CreateUserDto): Promise<IResponse> {
		return this.createRecord(createUserDto, true)
	}

	/**
	 * @description example get query
	 * @returns
	 */
	@Get()
	@ApiDocUser()
	@UseGuards(JwtAuthGuard)
	get(): Promise<IResponse> {
		return this.fetchAllRecords({}, true)
	}
}
