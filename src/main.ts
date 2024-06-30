import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common'
import { ValidationError } from 'class-validator'
import { ValidationException } from './common/exceptions/validation.exception'
import { CustomExceptionFilter } from './common/exceptions/custom.exception'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { EnvVariables, NodeEnvironment } from './common/env-config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		/* Enables request from given domains and types */
		cors: {
			origin: '*',
			methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']
		},

		/* Whether to use underlying platform body parser */
		bodyParser: true
	})

	const configService = app.get(ConfigService<EnvVariables, true>)

	const logger = new Logger(AppModule.name)

	/* Enables App versioning */
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1'
	})

	/* Global Pipes */
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			transformOptions: {
				enableImplicitConversion: true
			},

			exceptionFactory: (errors: ValidationError[] = []) =>
				new ValidationException(
					errors.map((error: any) => ({
						field: error['property'],
						value: error['value'],
						messages: error['constraints']
					}))
				)
		})
	)
	/* Global Interceptor */
	app.useGlobalInterceptors(new TransformInterceptor())

	/* Global Filter */
	app.useGlobalFilters(new CustomExceptionFilter())

	/* Swagger configuration */
	if (
		configService.get('NODE_ENV', { infer: true }) !== NodeEnvironment.Prod
	) {
		const swaggerConfig = new DocumentBuilder()
			.setTitle('App name')
			.setDescription('Swagger based API documentation for App name.')
			.setVersion('1.0')
			.addBearerAuth()
			.build()

		const document = SwaggerModule.createDocument(app as any, swaggerConfig)

		SwaggerModule.setup('/v1/api-doc', app as any, document)
	}

	const port = configService.get<number>('PORT', { infer: true }) || 3000

	logger.debug(
		`Application launched on port ${port} in ${new Date()} timezone.`
	)

	await app.listen(port)
}
bootstrap()
