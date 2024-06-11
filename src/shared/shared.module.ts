import { Module } from '@nestjs/common'
import { QueueModule } from './queue/queue.module'
import { EmailModule } from './email/email.module'

@Module({
	imports: [QueueModule, EmailModule],
	exports: [QueueModule]
})
export class SharedModule {}
