import { Injectable } from '@nestjs/common'
import {
	SecretsManagerClient,
	GetSecretValueCommand
} from '@aws-sdk/client-secrets-manager'

@Injectable()
export class AwsSecretsService {
	private client: SecretsManagerClient

	constructor() {
		this.client = new SecretsManagerClient({
			region: process.env.AWS_REGION,
			credentials: {
				accessKeyId: process.env.AWS_ACCESS,
				secretAccessKey: process.env.AWS_SECRET
			}
		})
	}

	async getSecret(): Promise<string | Record<string, any>> {
		const command = new GetSecretValueCommand({
			SecretId: process.env.AWS_SECRET_ID
		})

		try {
			const response = await this.client.send(command)
			if (response.SecretString) {
				return JSON.parse(response.SecretString)
			}
			throw new Error('Secret not found or invalid')
		} catch (error) {
			throw new Error(`Failed to retrieve secret: ${error.message}`)
		}
	}
}
