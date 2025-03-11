import { Response } from 'express'
import {
	ArgumentsHost,
	BadGatewayException,
	BadRequestException,
	Catch,
	ConflictException,
	ExceptionFilter,
	ForbiddenException,
	GatewayTimeoutException,
	HttpException,
	HttpStatus,
	InternalServerErrorException,
	NotAcceptableException,
	NotFoundException,
	PayloadTooLargeException,
	ServiceUnavailableException,
	UnauthorizedException
} from '@nestjs/common'
import { ThrottlerException } from '@nestjs/throttler'
import {
	CannotCreateEntityIdMapError,
	EntityNotFoundError,
	QueryFailedError
} from 'typeorm'
import { CommonService } from '../common.service'
import { ValidationException } from './validation.exception'
import {
	AuthResponseMessage,
	ErrorMessage
} from '../utils/consts/variables.const'

/**
 * Custom exception filter to handle various types of exceptions and format the response accordingly.
 */

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
	/**
	 * Method to catch and handle exceptions.
	 * @param {unknown} exception - The exception thrown.
	 * @param {ArgumentsHost} host - The arguments host.
	 */
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		let message: string
		let statusCode: HttpStatus
		let validationErrors: any

		const exceptionHandlers = new Map<any, () => void>([
			[
				HttpException,
				() => {
					statusCode = (exception as HttpException).getStatus()
					message = (exception as HttpException).getResponse()[
						'error'
					]
				}
			],
			[
				ValidationException,
				() => {
					statusCode = (exception as ValidationException).getStatus()
					message = (exception as ValidationException)['message']
					validationErrors = (exception as ValidationException)[
						'validationErrors'
					]
				}
			],
			[
				UnauthorizedException,
				() => {
					statusCode = (
						exception as UnauthorizedException
					).getStatus()
					message = AuthResponseMessage.UNAUTHORIZED_ACCESS
				}
			],
			[
				BadRequestException,
				() => {
					statusCode = (exception as BadRequestException).getStatus()
					message = (exception as BadRequestException).getResponse()[
						'message'
					]
				}
			],
			[
				PayloadTooLargeException,
				() => {
					statusCode = (
						exception as PayloadTooLargeException
					).getStatus()
					message = (
						exception as PayloadTooLargeException
					).getResponse()['message']
				}
			],
			[
				QueryFailedError,
				() => {
					statusCode = HttpStatus.UNPROCESSABLE_ENTITY
					const errorMessage = (exception as QueryFailedError)[
						'message'
					]
					message = errorMessage.includes(
						ErrorMessage.UNIQUE_KEY_VIOLATED
					)
						? ErrorMessage.RECORD_ALREADY_EXIST
						: errorMessage
				}
			],
			[
				EntityNotFoundError,
				() => {
					statusCode = HttpStatus.UNPROCESSABLE_ENTITY
					message = (exception as EntityNotFoundError)['message']
				}
			],
			[
				CannotCreateEntityIdMapError,
				() => {
					statusCode = HttpStatus.UNPROCESSABLE_ENTITY
					message = (exception as CannotCreateEntityIdMapError)[
						'message'
					]
				}
			],
			[
				ForbiddenException,
				() => {
					statusCode = (exception as ForbiddenException).getStatus()
					message = ErrorMessage.UNAUTHORIZED_OPERATION
				}
			],
			[
				NotAcceptableException,
				() => {
					statusCode = (
						exception as NotAcceptableException
					).getStatus()
					message = (exception as NotAcceptableException)['message']
				}
			],
			[
				ThrottlerException,
				() => {
					statusCode = (exception as ThrottlerException).getStatus()
					message = ErrorMessage.TOO_MANY_REQUESTS
				}
			],
			[
				InternalServerErrorException,
				() => {
					statusCode = (
						exception as InternalServerErrorException
					).getStatus()
					message = ErrorMessage.INTERNAL_SERVER_ERROR
				}
			],
			[
				ConflictException,
				() => {
					statusCode = (exception as ConflictException).getStatus()
					message = ErrorMessage.CONFLICT
				}
			],
			[
				ServiceUnavailableException,
				() => {
					statusCode = (
						exception as ServiceUnavailableException
					).getStatus()
					message = ErrorMessage.SERVICE_UNAVAILABLE
				}
			],
			[
				BadGatewayException,
				() => {
					statusCode = HttpStatus.BAD_GATEWAY
					message = ErrorMessage.SOMETHING_WENT_WRONG
				}
			],
			[
				GatewayTimeoutException,
				() => {
					statusCode = HttpStatus.GATEWAY_TIMEOUT
					message = ErrorMessage.SOMETHING_WENT_WRONG
				}
			],
			[
				NotFoundException,
				() => {
					statusCode = HttpStatus.NOT_FOUND
					message = ErrorMessage.SOMETHING_WENT_WRONG
				}
			]
		])

		const handler = exceptionHandlers.get(exception.constructor)
		if (handler) {
			handler()
		} else {
			statusCode = HttpStatus.FAILED_DEPENDENCY
			message = (exception as any)['message']
		}
		response
			.status(statusCode)
			.json(
				CommonService.handleValidationError(
					message,
					statusCode,
					validationErrors
				)
			)
	}
}
