import { Controller, Get, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { JwtAuthGuard } from './features/auth/guard/jwt-auth.guard'
import { CurrentUser } from './features/auth/decorator/current-user.decorator'
import { ICurrentUser } from './common/interfaces/current-user.interface'
import { ConfigService } from '@nestjs/config'

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly configService: ConfigService
	) {}

	@Get()
	getHello(): string {
		return this.appService.getHello()
	}

	@Get('me')
	@UseGuards(JwtAuthGuard)
	getUser(@CurrentUser() user: ICurrentUser): ICurrentUser {
		return user
	}

	@Get('secret')
	checkSecret(): string {
		return this.configService.get('APP_NAME')
	}
}
