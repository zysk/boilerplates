import { Type } from 'class-transformer';
import {
	IsNumber,
	IsEnum,
	IsString,
	IsBoolean,
	IsOptional,
	IsNotEmpty
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
	@IsNotEmpty()
	NODE_ENV: NodeEnvironment;

	@IsString()
	@IsNotEmpty()
	DB_HOST: string;

	@IsString()
	@IsNotEmpty()
	DB_USER: string;

	@IsString()
	@IsNotEmpty()
	DB_PASS: string;

	@IsString()
	@IsNotEmpty()
	DB_NAME: string;

	@IsBoolean()
	@IsOptional()
	@Type(() => Boolean)
	DB_LOGGING = false;

	@IsBoolean()
	@IsOptional()
	@Type(() => Boolean)
	DB_SSL = true;

	@IsNotEmpty()
	@IsString()
	BASE_PATH: string;
}
