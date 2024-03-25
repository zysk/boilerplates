import { Type } from 'class-transformer';
import {
	IsNumber,
	IsEnum,
	IsString,
	IsBoolean,
	IsOptional
} from 'class-validator';

export enum NodeEnvironment {
	Dev = 'dev',
	Test = 'test',
	Prod = 'prod'
}

export class EnvVariables {
	@IsNumber()
	PORT: number;

	@IsEnum(NodeEnvironment)
	NODE_ENV: NodeEnvironment;

	@IsString()
	APP_URL: string;

	@IsString()
	DB_HOST: string;

	@IsString()
	DB_USER: string;

	@IsString()
	DB_PASS: string;

	@IsString()
	DB_NAME: string;

	@IsBoolean()
	@IsOptional()
	@Type(() => Boolean)
	DB_LOGGING = false;

	@IsBoolean()
	@IsOptional()
	@Type(() => Boolean)
	DB_SSL = true;
}
