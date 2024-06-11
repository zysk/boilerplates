import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'
import { EnvVariables } from './env-variables'

export function validateEnv(config: Record<string, unknown>): EnvVariables {
	const validateConfig = plainToInstance(EnvVariables, config, {
		enableImplicitConversion: true
	})

	const errors = validateSync(validateConfig, {
		skipMissingProperties: false
	})

	if (errors.length) {
		throw new Error(errors.toString())
	}
	return validateConfig
}
