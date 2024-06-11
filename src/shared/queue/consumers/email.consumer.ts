import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { MailChannel, QueuePattern } from '../enum/queue.enum'

@Processor(QueuePattern.MAIL)
export class MailConsumer {
	constructor() {}

	@Process(MailChannel.TEST)
	async testQueue(job: Job<{ testData: string }>) {
		const { testData } = job.data
		console.log('from consumer >', testData)
	}
}
