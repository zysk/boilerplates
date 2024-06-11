import { Type } from 'class-transformer'
import {
	IsNumber,
	IsEnum,
	IsString,
	IsBoolean,
	IsOptional,
	IsNotEmpty
} from 'class-validator'

export enum NodeEnvironment {
	Dev = 'dev',
	Test = 'test',
	Prod = 'prod'
}

export class EnvVariables {
	@IsNumber()
	PORT: number

	@IsEnum(NodeEnvironment)
	@IsNotEmpty()
	NODE_ENV: NodeEnvironment

	@IsString()
	@IsNotEmpty()
	DB_HOST: string

	@IsString()
	@IsNotEmpty()
	DB_USER: string

	@IsString()
	@IsNotEmpty()
	DB_PASS: string

	@IsString()
	@IsNotEmpty()
	DB_NAME: string

	@IsBoolean()
	@IsOptional()
	@Type(() => Boolean)
	DB_LOGGING = false

	@IsBoolean()
	@IsOptional()
	@Type(() => Boolean)
	DB_SSL = true

	@IsBoolean()
	@IsNotEmpty()
	@Type(() => Boolean)
	DB_SYNC: boolean = false

	@IsNotEmpty()
	@IsString()
	JWT_SECRET: string

	@IsNotEmpty()
	@IsString()
	JWT_EXPIRE: string

	@IsNotEmpty()
	@IsString()
	REDIS_HOST: string

	@IsNotEmpty()
	@IsString()
	REDIS_PORT: string

	@IsNotEmpty()
	@IsString()
	REDIS_PASSWORD: string

	@IsNotEmpty()
	@IsString()
	MAX_JOB_WITHIN_DURATION: string

	@IsNotEmpty()
	@IsString()
	QUEUE_DURATION: string

	@IsNotEmpty()
	@IsString()
	JOB_DELAY: string

	@IsNotEmpty()
	@IsString()
	SMTP_SERVER: string

	@IsNotEmpty()
	@IsNumber()
	SMTP_PORT: number

	@IsNotEmpty()
	@IsString()
	SMTP_USER: string

	@IsNotEmpty()
	@IsString()
	SMTP_PASSWORD: string

	@IsNotEmpty()
	@IsString()
	ADMIN_MAIL: string
}
