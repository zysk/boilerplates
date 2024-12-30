import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod
} from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { validateEnv } from './common/env-config/validate-env'
import { ConfigModule } from '@nestjs/config'
import { RequestLoggerMiddleware } from './common/middlewares/request-logger.middleware'
import { FeaturesModule } from './features/features.module'
import { SharedModule } from './shared/shared.module'
import { AwsSecretsService } from './common/env-config/aws-secrets'
import { getDataSourceOptions } from './database/data-source'

async function fetchSecrets() {
	const awsSecretsService = new AwsSecretsService()
	try {
		return await awsSecretsService.getSecret()
	} catch (error) {
		throw new Error('Failed to fetch secrets')
	}
}

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [
				async () => {
					const secrets = await fetchSecrets()
					return validateEnv(secrets as Record<string, unknown>)
				}
			]
		}),
		TypeOrmModule.forRootAsync({
			useFactory: async () => {
				// todo instead of manually fetching secrets, use the ConfigService
				const secrets = await fetchSecrets()
				return {
					...(await getDataSourceOptions(secrets))
				}
			}
		}),
		FeaturesModule,
		SharedModule
	],
	controllers: [AppController],
	providers: [AppService]
})

/* HTTP request logger middleware */
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(RequestLoggerMiddleware)
			.forRoutes({ path: '*', method: RequestMethod.ALL })
	}
}
