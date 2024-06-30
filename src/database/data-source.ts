import { config } from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'
import { NodeEnvironment } from '../common/env-config'
import { Logger } from '@nestjs/common'

if (process.env.NODE_ENV == NodeEnvironment.Test) {
	config({ path: '.env.test' })
} else {
	config()
}

const logger = new Logger('Database')

export const dataSourceOptions: DataSourceOptions = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: process.env.DB_PORT as unknown as number,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	entities:
		process.env.NODE_ENV == NodeEnvironment.Test
			? ['src/features/**/*.entity.ts']
			: ['dist/features/**/*.entity.js'],
	migrations: ['dist/database/migrations/*.js'],
	logging: process.env.DB_LOGGING == 'true',
	ssl: process.env.DB_SSL == 'true',
	logger: 'advanced-console',
	synchronize: process.env.DB_SYNC == 'true'
}

const dataSource = new DataSource(dataSourceOptions)
dataSource
	.initialize()
	.then(() => {
		logger.debug('📅 Connection to database successful..')
	})
	.catch((err) => {
		logger.error('💣 Error during database connection:', err)
	})

export default dataSource
