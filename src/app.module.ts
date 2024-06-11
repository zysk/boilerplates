import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod
} from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOptions } from './database/data-source'
import { validateEnv } from './common/env-config'
import { ConfigModule } from '@nestjs/config'
import { RequestLoggerMiddleware } from './common/middlewares/request-logger.middleware'
import { FeaturesModule } from './features/features.module'
import { SharedModule } from './shared/shared.module'

@Module({
	imports: [
		TypeOrmModule.forRoot(dataSourceOptions),
		ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
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
