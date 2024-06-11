import { DataSource } from 'typeorm'
import { Logger } from '@nestjs/common'
import { User } from '../../features/auth/entities/user.entity'

export const seedUser = async (dataSource: DataSource) => {
	const logger = new Logger('Seeder')
	logger.warn('🌱 Running user seeder...')

	const userRepository = dataSource.getRepository(User)

	const users: User[] = [
		{ name: 'example', email: 'mail@example.com', password: 'example' }
	]

	for (const user of users) {
		const existingUser = await userRepository.findOne({
			where: { name: user.name }
		})
		if (!existingUser) {
			await userRepository.save(user)
		}
	}
}
