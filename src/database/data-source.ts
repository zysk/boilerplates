import { DataSource, DataSourceOptions } from 'typeorm'
import { Logger } from '@nestjs/common'
import { AwsSecretsService } from '../common/env-config/aws-secrets'

const logger = new Logger('Database')

async function getDataSourceOptions(secrets: any): Promise<DataSourceOptions> {
	return {
		type: 'postgres',
		host: secrets.DB_HOST as string,
		port: parseInt(secrets.DB_PORT as string, 10),
		username: secrets.DB_USER as string,
		password: secrets.DB_PASS as string,
		database: secrets.DB_NAME as string,
		entities: ['dist/features/**/*.entity.js'],
		migrations: ['dist/database/migrations/*.js'],
		logging: secrets.DB_LOGGING === 'true',
		ssl: secrets.DB_SSL === 'true',
		logger: 'advanced-console',
		synchronize: secrets.DB_SYNC === 'true'
	}
}

let dataSourceOptions: DataSourceOptions

async function dataSource() {
	const awsSecretsService = new AwsSecretsService()
	const secrets: any = await awsSecretsService.getSecret()
	dataSourceOptions = await getDataSourceOptions(secrets)
	const dataSource = new DataSource(dataSourceOptions)
	dataSource
		.initialize()
		.then(() => {
			logger.debug('📅 Connection to database successful..')
		})
		.catch((err) => {
			logger.error('💣 Error during database connection:', err)
		})

	return dataSource
}

export { getDataSourceOptions, dataSource }
