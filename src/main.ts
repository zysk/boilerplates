import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dataSource from './database/data-source';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationException } from './common/exceptions/validation.exception';
import { CustomExceptionFilter } from './common/exceptions/custom.exception';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const configService = new ConfigService();

	const app = await NestFactory.create(AppModule, {
		/* Enables request from given domains and types */
		cors: {
			origin: '*',
			methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']
		},

		/* Whether to use underlying platform body parser */
		bodyParser: true
	});

	app.setGlobalPrefix(configService.get<string>('BASE_PATH'));

	/*Global Pipes, Interceptors and Filters*/
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
	);

	app.useGlobalInterceptors(new TransformInterceptor());

	app.useGlobalFilters(new CustomExceptionFilter());

	/*Swagger configuration*/
	const swaggerConfig = new DocumentBuilder()
		.setTitle('App name')
		.setDescription('Swagger based API documentation for App name.')
		.setVersion('1.0')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app as any, swaggerConfig);

	SwaggerModule.setup('api/v1/api-doc', app as any, document);

	// Data Seeding connection
	dataSource
		.initialize()
		.then(async () => {
			//Example
			/* await  (dataSource) */

			/* Add the the seeder config here */
			dataSource.destroy();
		})
		.catch((error) => {
			console.error(error);
			dataSource.destroy();
		});

	await app.listen(configService.get<number>('PORT'));
}
bootstrap();
