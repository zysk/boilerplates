import { Injectable } from '@nestjs/common'
import {
	AbilityBuilder,
	PureAbility,
	AbilityClass,
	ExtractSubjectType,
	InferSubjects
} from '@casl/ability'
import { User } from '../entities/user.entity'
import { RoleEnum } from '../enum/role.enum'
import { RoleRepository } from '../repositories/role.repository'

export enum Action {
	Manage = 'manage',
	Create = 'create',
	Read = 'read',
	Update = 'update',
	Delete = 'delete'
}

export type Subjects = InferSubjects<typeof User> | 'all'
export type AppAbility = PureAbility<[Action, Subjects]>

@Injectable()
export class CaslAbilityFactory {
	constructor(private readonly roleRepository: RoleRepository) {}

	async createForUser(user: User): Promise<AppAbility> {
		const { can, cannot, build } = new AbilityBuilder<
			PureAbility<[Action, Subjects]>
		>(PureAbility as AbilityClass<AppAbility>)

		const userRole = await this.roleRepository.fetchOneRecord({
			where: { id: user.role.id },
			select: { id: true, name: true }
		})

		if (userRole.name === RoleEnum.ADMIN) {
			can(Action.Manage, 'all') // Admin can do anything
		} else {
			cannot(Action.Read, User).because('Only admins can read users')
			cannot(Action.Delete, User).because('Only admins can delete users')
		}
		return build({
			detectSubjectType: (item) =>
				item.constructor as ExtractSubjectType<Subjects>
		})
	}
}
