import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CommonController } from '../common/common.controller';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController extends CommonController<User> {
	constructor(private readonly userService: UserService) {
		super(userService);
	}

	/**
	 * @description Example post query
	 * @param createUserDto
	 * @returns
	 */
	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.createRecord(createUserDto, true);
	}

	/**
	 * @description example get query
	 * @returns
	 */
	@Get()
	get() {
		return this.fetchAllRecords({}, true);
	}
}
