import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { ConfigService } from '@nestjs/config'
import { NodeEnvironment } from '../../common/env-config'
import { QueuePattern } from './enum/queue.enum'
import { MailConsumer } from './consumers/email.consumer'
import { MailProducer } from './providers/email.provider'

@Module({
	imports: [
		BullModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const redisConfig = {
					host: configService.get<string>('REDIS_HOST'),
					port: configService.get<number>('REDIS_PORT'),
					ttl: 0,
					isGlobal: true
				}
				if (configService.get('NODE_ENV') == NodeEnvironment.Prod) {
					Object.assign(redisConfig, {
						tls: { rejectUnauthorized: false },
						password: configService.get<string>('REDIS_PASSWORD')
					})
				}
				return {
					redis: { ...redisConfig },
					limiter: {
						max: configService.get<number>(
							'MAX_JOB_WITHIN_DURATION'
						),
						duration: configService.get<number>('QUEUE_DURATION')
					},
					defaultJobOptions: {
						delay: configService.get<number>('JOB_DELAY')
					}
				}
			}
		}),
		BullModule.registerQueue(
			{ name: QueuePattern.MAIL }
			// { name: QueuePattern.UPLOAD }
		)
	],
	providers: [MailConsumer, MailProducer],
	exports: [MailProducer]
})
export class QueueModule {}
