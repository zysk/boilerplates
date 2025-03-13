import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common'
import { UserService } from './services/user.service'
import { CreateUserDto, LoginDto } from './dto/create-user.dto'
import { CommonController } from '../../common/common.controller'
import { User } from './entities/user.entity'
import { ApiDocUser } from '../../shared/swagger/user-doc.decorator'
import { IResponse } from '../../common/types/types'
import { JwtAuthGuard } from './guard/jwt-auth.guard'
import { AbilitiesGuard } from './guard/abilities.guard'
import { CheckAbilities } from './decorator/abilities.decorator'
import { Action } from './guard/casl-ability.factory'
import { AuthService } from './services/auth.service'

@Controller('user')
export class UserController extends CommonController<User> {
	constructor(
		private readonly userService: UserService,
		private readonly authService: AuthService
	) {
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
	public create(@Body() createUserDto: CreateUserDto): Promise<IResponse> {
		return this.createRecord(createUserDto, true)
	}

	@Post('login')
	public async login(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto)
	}

	/**
	 * @description Example get query
	 * @returns
	 */
	@Get()
	@ApiDocUser()
	@UseGuards(JwtAuthGuard, AbilitiesGuard)
	@CheckAbilities({ action: Action.Read, subject: User }) //Note: Only admin can access the users
	get(): Promise<IResponse> {
		return this.fetchAllRecords({}, true)
	}
}
