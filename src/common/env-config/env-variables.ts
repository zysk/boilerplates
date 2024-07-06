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
	/**
	 * Environment
	 */
	@IsString()
	@IsNotEmpty()
	APP_NAME: string

	@IsEnum(NodeEnvironment)
	@IsNotEmpty()
	NODE_ENV: NodeEnvironment = NodeEnvironment.Dev

	/**
	 * System
	 */
	@IsNumber()
	@IsNotEmpty()
	PORT: number = 3000

	@IsString()
	@IsNotEmpty()
	TZ: string = 'UTC'

	/**
	 * Database
	 */
	@IsString()
	@IsNotEmpty()
	DB_HOST: string

	@IsNumber()
	@IsNotEmpty()
	DB_PORT: number

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

	/**
	 * JWT
	 */
	@IsNotEmpty()
	@IsString()
	JWT_SECRET: string

	@IsNotEmpty()
	@IsString()
	JWT_EXPIRE: string

	/**
	 * Redis Bull
	 */
	@IsNotEmpty()
	@IsString()
	REDIS_HOST: string

	@IsNotEmpty()
	@IsNumber()
	REDIS_PORT: number

	@IsNotEmpty()
	@IsString()
	REDIS_PASSWORD: string

	@IsNotEmpty()
	@IsNumber()
	MAX_JOB_WITHIN_DURATION: number

	@IsNotEmpty()
	@IsNumber()
	QUEUE_DURATION: number

	@IsNotEmpty()
	@IsNumber()
	JOB_DELAY: number

	/**
	 * SMTP
	 */
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
