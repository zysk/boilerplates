import { Controller, Get, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { JwtAuthGuard } from './features/auth/guard/jwt-auth.guard'
import { CurrentUser } from './features/auth/decorator/current-user.decorator'
import { ICurrentUser } from './common/utils/interfaces/current-user.interface'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello()
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	getUser(@CurrentUser() user: ICurrentUser): ICurrentUser {
		return user
	}
}
