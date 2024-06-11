import { HttpStatus, applyDecorators } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiUnauthorizedResponse
} from '@nestjs/swagger'
import {
	AuthResponseMessage,
	ResponseMessage
} from 'src/common/utils/consts/variables.const'

export const ApiAuthDecorators = () => {
	return applyDecorators(
		ApiBearerAuth(),
		ApiUnauthorizedResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: AuthResponseMessage.UNAUTHORIZED_ACCESS
		})
	)
}

export const ApiSuccessDecorators = () => {
	return applyDecorators(
		ApiOkResponse({
			description: ResponseMessage.QUERY_SUCCESS
		})
	)
}
