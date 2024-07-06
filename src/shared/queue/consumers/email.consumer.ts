import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { MailChannel, QueuePattern } from '../enum/queue.enum'
import { Logger } from '@nestjs/common'

@Processor(QueuePattern.MAIL)
export class MailConsumer {
	private logger = new Logger(MailConsumer.name)
	@Process(MailChannel.TEST)
	async testQueue(job: Job<{ testData: string }>) {
		const { testData } = job.data
		this.logger.log('from consumer >', testData)
	}
}
