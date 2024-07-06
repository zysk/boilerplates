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
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { SwaggerDescription } from './common/utils/consts/variables.const'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
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

	/* Static home page */
	app.useStaticAssets(join(process.cwd(), '/src/assets/views'))

	/* Global Pipes */
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			transformOptions: {
				enableImplicitConversion: true
			},

			exceptionFactory: (errors: ValidationError[] = []) =>
				new ValidationException(
					errors.map((error) => ({
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
			.setTitle(configService.get('APP_NAME'))
			.setDescription(SwaggerDescription)
			.setVersion('1.0')
			.addBearerAuth()
			.build()

		const document = SwaggerModule.createDocument(app, swaggerConfig)

		SwaggerModule.setup('/v1/api-doc', app, document, {
			customSiteTitle: 'Swagger Docs'
		})
	}

	/* Port */
	const port = configService.get<number>('PORT', { infer: true }) || 3000

	logger.debug(
		`🚀 Application launched on port ${port} in ${new Date()} timezone.`
	)

	await app.listen(port)
}
bootstrap()
