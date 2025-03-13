export const RegEx = {
	PASSWORD:
		/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^.&*-]).{8,12}$/
}

export const ResponseMessage = {
	QUERY_SUCCESS: 'Query success'
}

export const SwaggerDescription = `Swagger-based API documentation for App Name`

export const ErrorMessage = {
	VALID_FIELD_REQUIRED: (field: string) =>
		`Please enter a valid ${field.toLowerCase()}.`,
	SOMETHING_WENT_WRONG: 'Something went wrong.',
	TOO_MANY_REQUESTS: 'Too many requests. Please try again in a minute.',
	RECORD_ALREADY_EXISTS: 'Record already exists.',
	UNAUTHORIZED_ACCESS: 'Unauthorized access.',
	UNAUTHORIZED_OPERATION: 'Operation not permitted.',
	UNIQUE_KEY_VIOLATION: 'Duplicate key value violates unique constraint.'
}

export const EmailMessage = {
	EMAIL_FAILED: 'Email sending failed.'
}

export const AuthResponseMessage = {
	UNAUTHORIZED_ACCESS: 'Unauthorized access.',
	USER_NOT_FOUND: 'User not found.',
	INVALID_PASSWORD: 'Invalid password',
	LOGIN_SUCCESSFUL: 'Login successfully'
}

export const IntegrationResponses = {}

export function toTitleCase(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export const DtoMessage = {
	MIN_LENGTH: (field: string, value: number | string): string =>
		`${toTitleCase(field)} must be at least ${value} characters`,
	MAX_LENGTH: (field: string, value: number | string): string =>
		`${toTitleCase(field)} must not exceed ${value} characters`
}
