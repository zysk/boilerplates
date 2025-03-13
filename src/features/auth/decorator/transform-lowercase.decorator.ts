import { Transform } from 'class-transformer'

export function TransformToLowercase(): PropertyDecorator {
	return Transform(({ value }) =>
		typeof value === 'string' ? value.toLowerCase() : value
	)
}
