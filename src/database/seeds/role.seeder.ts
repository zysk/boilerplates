import { DataSource } from 'typeorm'
import { Logger } from '@nestjs/common'
import { Role } from '../../features/auth/entities/role.entity'
import { RoleEnum } from 'src/features/auth/enum/role.enum'

export const seedRole = async (dataSource: DataSource) => {
	const logger = new Logger('Seeder')
	logger.warn('🌱 Running role seeder...')

	const roleRepository = dataSource.getRepository(Role)

	const roles: Role[] = [{ name: RoleEnum.ADMIN }]

	for (const role of roles) {
		const existingRole = await roleRepository.findOne({
			where: { name: role.name }
		})
		if (!existingRole) {
			await roleRepository.save(role)
		}
	}
}
