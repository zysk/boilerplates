import { ConfigService } from '@nestjs/config'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserRepository } from '../repositories/user.repository'
import { User } from '../entities/user.entity'
import { IJwtPayload } from '../interface/auth.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly configService: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get<string>('JWT_SECRET')
		})
	}

	async validate(payload: IJwtPayload): Promise<User> {
		try {
			const user = await this.userRepository.fetchOneRecord({
				where: [{ email: payload.email }],
				select: ['id', 'email']
			})

			if (!user) {
				throw new UnauthorizedException()
			}
			return user
		} catch (error) {
			throw new UnauthorizedException()
		}
	}
}
