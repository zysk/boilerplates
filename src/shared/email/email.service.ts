import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as nodemailer from 'nodemailer'
import { EmailMessage } from '../../common/utils/consts/variables.const'

@Injectable()
export class EmailService {
	private transporter

	constructor(private configService: ConfigService) {
		this.transporter = nodemailer.createTransport({
			host: configService.get<string>('SMTP_SERVER'),
			port: configService.get<number>('SMTP_PORT') || 587,
			auth: {
				user: configService.get<string>('SMTP_USER'),
				pass: configService.get<string>('SMTP_PASSWORD')
			}
		})
	}

	async sendTestEmail(email: string, firstName: string) {
		try {
			await this.transporter.sendMail({
				from: this.configService.get<string>('ADMIN_MAIL'),
				to: email,
				subject: 'subject',
				html: `<p>Hello ${firstName}</p>`
			})
		} catch (error) {
			throw new HttpException(
				EmailMessage.EMAIL_FAILED,
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}
}
