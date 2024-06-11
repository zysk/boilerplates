import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { ICurrentUser } from '../../../common/utils/interfaces/current-user.interface'

export const CurrentUser = createParamDecorator(
	(data: never, ctx: ExecutionContext): ICurrentUser => {
		const req = ctx.switchToHttp().getRequest()
		return req['user'] ?? {}
	}
)
