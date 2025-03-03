import { BadRequestException } from '@nestjs/common'

interface IError {
	field: string
	value: unknown
	messages: string[]
}

/**
 * @class ValidationException
 * @extends BadRequestException
 *
 * Custom exception class for handling validation errors.
 *
 * @param {IError[]} validationErrors - Array of validation error objects.
 */
export class ValidationException extends BadRequestException {
	constructor(public validationErrors: IError[]) {
		super(ValidationException.createMessage(validationErrors))
	}

	/**
	 * Creates a custom error message from the validation errors.
	 * @param {IError[]} validationErrors - Array of validation error objects.
	 * @returns {string} - Custom error message.
	 */
	private static createMessage(validationErrors: IError[]): string {
		return validationErrors
			.map((error) => `${error.field}: ${error.messages.join(', ')}`)
			.join('; ')
	}
}
