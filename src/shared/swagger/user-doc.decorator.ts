import { applyDecorators } from '@nestjs/common'
import { ApiAuthDecorators, ApiSuccessDecorators } from './common-doc.decorator'

export const ApiDocUser = () => {
	return applyDecorators(ApiAuthDecorators(), ApiSuccessDecorators())
}
