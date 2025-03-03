import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'
import { EnvVariables } from './env-variables'

/**
 * Validates the environment configuration.
 *
 * @param {Record<string, unknown>} config - The environment configuration object.
 * @returns {EnvVariables} - The validated environment variables.
 * @throws {Error} - Throws an error if validation fails.
 */

export function validateEnv(config: Record<string, unknown>): EnvVariables {
	const validateConfig = plainToInstance(EnvVariables, config, {
		enableImplicitConversion: true
	})

	const errors = validateSync(validateConfig, {
		skipMissingProperties: false
	})

	if (errors.length > 0) {
		const errorMessages = errors
			.map((error) => Object.values(error.constraints || {}).join(', '))
			.join('; ')
		throw new Error(`Validation failed: ${errorMessages}`)
	}
	return validateConfig
}
