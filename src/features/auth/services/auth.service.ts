import { HttpStatus, Injectable } from '@nestjs/common'
import { UserRepository } from '../repositories/user.repository'
import { User } from '../entities/user.entity'
import { CommonService } from 'src/common/common.service'
import { LoginDto } from '../dto/create-user.dto'
import { IResponse } from 'src/common/types/types'
import { AuthResponseMessage } from 'src/common/utils/consts/variables.const'
import { comparePassword } from 'src/common/utils/crypt/bcrypt.util'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService extends CommonService<User> {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {
		super(userRepository)
	}

	private async generateAccessToken(
		id: string,
		email: string,
		role: number
	): Promise<string> {
		email = email.toLowerCase()
		const payload: JwtPayload = { id, email, role }
		const accessToken = this.jwtService.sign(payload, {
			secret: this.configService.get<string>('JWT_SECRET')
		})
		return accessToken
	}

	public async login(loginDto: LoginDto): Promise<IResponse> {
		const { email, password } = loginDto
		const user = await this.userRepository.fetchOneRecord({
			where: { email },
			select: {
				id: true,
				email: true,
				password: true,
				role: { id: true }
			}
		})
		if (!user) {
			return this.handleError({
				message: AuthResponseMessage.USER_NOT_FOUND,
				statusCode: HttpStatus.NOT_FOUND
			})
		}
		if (!user.password || !comparePassword(password, user.password)) {
			return this.handleError({
				message: AuthResponseMessage.INVALID_PASSWORD,
				statusCode: HttpStatus.UNAUTHORIZED
			})
		}
		const token = await this.generateAccessToken(
			user.id,
			user.email,
			user.role.id
		)
		return this.handleSuccess({
			message: AuthResponseMessage.LOGIN_SUCCESSFUL,
			data: {
				accessToken: token
			}
		})
	}
}
