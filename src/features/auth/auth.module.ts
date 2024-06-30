import { Module } from '@nestjs/common'
import { UserService } from './services/user.service'
import { UserController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { UserRepository } from './repositories/user.repository'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: {
					expiresIn: configService.get<string>('JWT_EXPIRE')
				}
			}),
			inject: [ConfigService]
		})
	],
	controllers: [UserController],
	providers: [UserService, UserRepository, JwtStrategy],
	exports: [UserRepository]
})
export class AuthModule {}
