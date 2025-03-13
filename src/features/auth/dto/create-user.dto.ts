import { ApiProperty } from '@nestjs/swagger'
import {
	IsEmail,
	IsNotEmpty,
	IsString,
	Matches,
	MaxLength,
	MinLength
} from 'class-validator'
import { TransformToLowercase } from '../decorator/transform-lowercase.decorator'
import { DtoMessage } from 'src/common/utils/consts/variables.const'

export class CreateUserDto {
	@IsString()
	@IsEmail()
	@IsNotEmpty()
	@ApiProperty({ example: 'abc@gmail.com' })
	@TransformToLowercase()
	email: string
	@IsString()
	@IsNotEmpty()
	@MinLength(8, { message: DtoMessage.MIN_LENGTH('Password', 8) })
	@MaxLength(20, { message: DtoMessage.MAX_LENGTH('Password', 20) })
	@Matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z]).{8,20}$/, {
		message: 'password too weak'
	})
	@ApiProperty({ example: 'wq20sca' })
	password: string
}

export class LoginDto {
	@IsString()
	@IsEmail()
	@IsNotEmpty()
	@ApiProperty({ example: 'abc@gmail.com' })
	@TransformToLowercase()
	email: string

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'abc@123' })
	password: string
}
