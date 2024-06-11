import { Type } from 'class-transformer'

export class QueryOptions {
	@Type(() => Number)
	skip: number

	@Type(() => Number)
	take: number
}
