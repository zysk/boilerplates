/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestException } from '@nestjs/common'

interface Error {
	field: string
	value: any
	messages: any
}

export class ValidationException extends BadRequestException {
	constructor(public validationErrors: Error[]) {
		super()
	}
}
