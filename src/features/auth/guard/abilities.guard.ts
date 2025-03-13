import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { CaslAbilityFactory } from './casl-ability.factory'
import { CHECK_ABILITY, RequiredRule } from '../decorator/abilities.decorator'

@Injectable()
export class AbilitiesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private caslAbilityFactory: CaslAbilityFactory
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const rules =
			this.reflector.get<RequiredRule[]>(
				CHECK_ABILITY,
				context.getHandler()
			) || []

		if (rules.length === 0) {
			return true // No rules defined means open to all
		}

		const { user } = context.switchToHttp().getRequest()
		if (!user) {
			return false // No user, no access
		}

		const ability = await this.caslAbilityFactory.createForUser(user)

		for (const rule of rules) {
			if (ability.cannot(rule.action, rule.subject)) {
				// Finding the relevant rule that caused the denial
				const relevantRule = ability.relevantRuleFor(
					rule.action,
					rule.subject
				)
				const denialReason =
					relevantRule?.reason || 'Access denied for this action'
				throw new ForbiddenException(denialReason)
			}
		}
		return true
	}
}
