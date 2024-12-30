import 'dotenv/config'
import { DataSource } from 'typeorm'
import { Logger } from '@nestjs/common'
import { dataSource } from '../data-source'
import { seedUser } from './user.seeder'

export const importSeeders = async (dataSource: DataSource) => {
	const logger = new Logger('Seeder')
	logger.warn('🥜 Running seeder files...')
	return dataSource
		.initialize()
		.then(async () => {
			await seedUser(dataSource)
			/*
			...
			 import your other seeders here
			...
			*/
			dataSource.destroy()
			logger.warn('🌳 Seeders successfully executed...')
		})
		.catch((error) => {
			logger.error(`🌵 ${error.message}`)
			dataSource.destroy()
		})
}
dataSource().then(importSeeders)
