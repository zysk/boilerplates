import { Response } from 'express'
import {
	ArgumentsHost,
	BadRequestException,
	Catch,
	ExceptionFilter,
	ForbiddenException,
	HttpException,
	HttpStatus,
	NotAcceptableException,
	PayloadTooLargeException,
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
import { ErrorMessage } from '../utils/consts/variables.const'

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		let message: string
		let statusCode: HttpStatus
		let validationErrors: any

		switch (exception.constructor) {
			case HttpException:
				statusCode = (exception as HttpException).getStatus()
				message = (exception as HttpException).getResponse()['error']
				break
			case ValidationException:
				statusCode = (exception as ValidationException).getStatus()
				message = (exception as ValidationException)['message']
				validationErrors = (exception as ValidationException)[
					'validationErrors'
				]
				break
			case UnauthorizedException:
				statusCode = (exception as UnauthorizedException).getStatus()
				message = ErrorMessage.UNAUTHORIZED_ACCESS
				break
			case BadRequestException:
				statusCode = (exception as BadRequestException).getStatus()
				message = (exception as BadRequestException).getResponse()[
					'message'
				]
				break
			case PayloadTooLargeException:
				statusCode = (exception as PayloadTooLargeException).getStatus()
				message = (exception as PayloadTooLargeException).getResponse()[
					'message'
				]
				break
			case QueryFailedError: // TypeORM error
				statusCode = HttpStatus.UNPROCESSABLE_ENTITY
				if (
					(exception as QueryFailedError)['message'].includes(
						ErrorMessage.UNIQUE_KEY_VIOLATION
					)
				) {
					message = ErrorMessage.RECORD_ALREADY_EXISTS
				} else {
					message = (exception as QueryFailedError)['message']
				}
				break
			case EntityNotFoundError: // TypeORM error
				statusCode = HttpStatus.UNPROCESSABLE_ENTITY
				message = (exception as EntityNotFoundError)['message']
				break
			case CannotCreateEntityIdMapError: // TypeORM error
				statusCode = HttpStatus.UNPROCESSABLE_ENTITY
				message = (exception as CannotCreateEntityIdMapError)['message']
				break
			case ForbiddenException:
				statusCode = (exception as ForbiddenException).getStatus()
				const forbiddenResponse = (
					exception as ForbiddenException
				).getResponse()
				if (
					typeof forbiddenResponse === 'object' &&
					forbiddenResponse !== null &&
					'message' in forbiddenResponse
				) {
					message = String(forbiddenResponse['message'])
				} else if (typeof forbiddenResponse === 'string') {
					message = forbiddenResponse
				} else {
					message = ErrorMessage.UNAUTHORIZED_OPERATION
				}
				break
			case NotAcceptableException:
				statusCode = (exception as NotAcceptableException).getStatus()
				message = (exception as CannotCreateEntityIdMapError)['message']
				break
			case ThrottlerException:
				statusCode = (exception as ThrottlerException).getStatus()
				message = ErrorMessage.TOO_MANY_REQUESTS
				break
			default:
				statusCode = HttpStatus.FAILED_DEPENDENCY
				message = exception['message']
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
