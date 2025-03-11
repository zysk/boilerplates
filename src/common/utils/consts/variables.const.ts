export const RegEx = {
	PWD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^.&*-]).{8,12}$/
}

export const ResponseMessage = {
	QUERY_SUCCESS: 'Query success'
}

export const SwaggerDescription = `Swagger based API documentation for App name`

export const ErrorMessage = {
	VALID_FIELD_REQUIRED: (field: string) =>
		`Please enter valid ${field.toLowerCase()}`,
	SOMETHING_WENT_WRONG: 'Something went wrong',
	TOO_MANY_REQUESTS: 'Too Many Requests. Please try after a minute!',
	RECORD_ALREADY_EXIST: 'Record already exist',
	UNAUTHORIZED_ACCESS: 'Unauthorized Access',
	UNAUTHORIZED_OPERATION: 'Operation not permitted',
	UNIQUE_KEY_VIOLATED: 'duplicate key value violates unique constraint',
	INTERNAL_SERVER_ERROR: 'Internal Server Error',
	CONFLICT: 'Conflict',
	SERVICE_UNAVAILABLE: 'Service Unavailable'
}

export const EmailMessage = {
	EMAIL_FAILED: 'Email sending failed'
}

export const AuthResponseMessage = {
	UNAUTHORIZED_ACCESS: 'Unauthorized Access'
}

export const IntegrationResponses = {}
