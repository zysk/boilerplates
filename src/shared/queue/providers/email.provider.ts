import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { MailChannel, QueuePattern } from '../enum/queue.enum'

@Injectable()
export class MailProducer {
	constructor(@InjectQueue(QueuePattern.MAIL) private queue: Queue) {}

	async testQueue(testData: string) {
		this.queue.add(MailChannel.TEST, { testData })
		return 'ok'
	}
}
