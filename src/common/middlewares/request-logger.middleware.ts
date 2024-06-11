import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
	private logger = new Logger('HTTP')

	use(req: Request, res: Response, next: NextFunction): void {
		const { ip, method, path: url } = req
		const agent = req.headers['user-agent']

		res.on('finish', () => {
			const { statusCode } = res
			this.logger.log(
				`{${method} ${url} ${statusCode}} - ${agent} - ${ip}`
			)
		})

		next()
	}
}
