import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PageOptions {
	@IsOptional()
	@ApiPropertyOptional()
	@IsInt()
	@Type(() => Number)
	page: number;

	@IsOptional()
	@ApiPropertyOptional()
	@IsInt()
	@Type(() => Number)
	take: number;
}
