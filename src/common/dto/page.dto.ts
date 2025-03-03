import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

export class PageOptions {
	@IsOptional()
	@ApiPropertyOptional({ default: 1 })
	@IsInt()
	@Type(() => Number)
	page: number = 1

	@IsOptional()
	@ApiPropertyOptional({ default: 10 })
	@IsInt()
	@Type(() => Number)
	take: number = 10
}
