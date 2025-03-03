import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

/**
 * @class RequestLoggerMiddleware
 * Middleware to log HTTP requests and responses.
 */
@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
	private readonly logger = new Logger('HTTP')
	/**
	 * Formats the current date and time as an ISO string in UTC.
	 * @returns {string} - The formatted date and time string.
	 */
	private DateTime(): string {
		return new Date().toISOString()
	}

	/**
	 * Logs the details of incoming HTTP requests and responses.
	 * @param {Request} req - The incoming request object.
	 * @param {Response} res - The outgoing response object.
	 * @param {NextFunction} next - The next middleware function in the request lifecycle.
	 */
	use(req: Request, res: Response, next: NextFunction): void {
		const { ip, method, path: url } = req
		const agent = req.headers['user-agent'] || 'unknown-agent'
		res.on('finish', () => {
			const { statusCode } = res
			this.logger.log(
				`${this.DateTime()} - ${method} ${url} ${statusCode}- ${agent} - ${ip}`
			)
		})

		next()
	}
}
