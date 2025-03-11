import { DataSource } from 'typeorm'
import { Logger } from '@nestjs/common'
import { User } from '../../features/auth/entities/user.entity'
import { Role } from 'src/features/auth/entities/role.entity'
import { RoleEnum } from 'src/features/auth/enum/role.enum'

export const seedUser = async (dataSource: DataSource) => {
	const logger = new Logger('Seeder')
	logger.warn('🌱 Running user seeder...')

	const userRepository = dataSource.getRepository(User)
	const roleRepository = dataSource.getRepository(Role)
	const role = await roleRepository.findOne({
		where: { name: RoleEnum.ADMIN },
		select: { id: true }
	})
	const users: User[] = [
		{
			name: 'admin',
			email: 'admin@gmail.com',
			password: 'admin@123',
			role: { id: role.id } as Role
		}
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
