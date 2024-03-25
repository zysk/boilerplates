export const RegEx = {
	PWD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^.&*-]).{8,12}$/
};

export const ResponseMessage = {
	LOGGED_IN: "Welcome! You're logged in",
	LOGGED_OUT: 'Logged out',
	SUCCESS_SIGN_UP: 'User Created Successfully',
	SUCCESS_SIGN_IN: 'Signin successful',
	SUCCESS_VERIFY_EMAIL: 'Email verified successfully',
	SUCCESS_VERIFY_OTP: 'OTP successfully verified',
	SUCCESS_USER_INFO_SAVE: 'User info updated successfully',
	SUCCESS_USER_PROFILE_SAVE: 'User profile updated successfully',
	OTP_SENT: 'OTP has been sent to your registered Email Id',
	OTP_RESENT: 'OTP resent successfully.',
	NO_RECORDS_FOUND: 'No record found',
	ACCESS_TOKEN_GENERATED: 'Access token generated',
	SUCCESS_LOG_OUT: 'Logged out successfully',
	QUERY_SUCCESS: 'Query success',
	PROFILE_PICTURE_UPLOADED: 'Profile  picture uploaded successfully',
	COMPANY_UPDATE: 'Company details updated successfully',
	API_KEY: 'API key is updated successfully',
	PWD_RESET: 'Password reset successful',
	TIMELOG_CAPTURED: 'Timelog captured successful',
	TIMELOG_UPDATED: 'Timelog updated successful',
	TIMELOG_DELETED: 'Timelog deleted'
};

export const ErrorMessage = {
	VALID_FIELD_REQUIRED: (field: string) =>
		`Please enter valid ${field.toLowerCase()}`,
	FAILED_TO_PROCESS_REQUEST:
		'Failed to process your request. Please try after sometime.',
	USER_UPDATE_FAILED: 'Failed to update user details',
	STATUS_UPDATE_FAILED: 'Failed to update status',
	NO_RECORD_FOUND: 'No records found',
	MAX_LIMITATION_EXCEED: 'You can select up to a maximum of 3 Goals',
	SMS_SEND_FAILED: 'Failed to send SMS',
	ENTER_VALID_NAME: 'Please enter valid name',
	ACCESS_DENIED: 'Access denied! Please contact admin',
	PASSWORD_NOT_MATCHED: "Password didn't match! Please try again.",
	ERROR_SENDING_OTP: 'Error while sending OTP',
	CREDENTIALS_NOT_MATCHED:
		"Your credentials doesn't match our records. Please contact admin for more details",
	INVALID_TOKEN_SIGNATURE: 'Invalid token signature',
	TOKEN_EXPIRE: 'Token expired',
	TOKEN_EXIST: 'Token exists',
	TOKEN_NOT_EXIST: 'Token not exist',
	SOMETHING_WENT_WRONG: 'Something went wrong',
	TOO_MANY_REQUESTS: 'Too Many Requests. Please try after a minute!',
	RECORD_ALREADY_EXIST: 'Record already exist',
	UNAUTHORIZED_ACCESS: 'Unauthorized Access',
	UNAUTHORIZED_OPERATION: 'Operation not permitted',
	UNIQUE_KEY_VIOLATED: 'duplicate key value violates unique constraint',
	INVALID_EMAIL: 'Invalid email',
	INVALID_PASSWORD: 'Invalid password',
	INVALID_OTP: 'OTP is invalid',
	OTP_NOT_VERIFIED: 'Please verify OTP first',
	EMAIL_NOT_VERIFIED: 'Email not verified',
	EMAIL_NOT_VERIFIED_OTP_SENT:
		'Email not verified. An OTP has been sent. Please verify your email',
	INVALID_CREDENTIALS: 'Invalid credentials',
	COMPANY_DEACTIVE: 'User with given details company is not active',
	USER_NOT_ACTIVE: 'User with given details is not active',
	USER_SAME_DETAILS: 'User with given details not found',
	USER_ALREADY_EXIST: 'User already exist',
	USER_NOT_FOUND: 'User not found',
	NOT_LOGIN_USER: 'Unauthorized, Please login',
	SIGNUP_NOT_INITIATED: 'Signup not initiated, Please signup again',
	FORGET_PWD_NOT_INITIATED:
		'Forget password not initiated, Please request for forget password again',
	PWD_RESET_LINK: 'Password reset link sent to your registered mail',
	NOT_ALLOWED_TO_LOGIN: 'You are not allowed to login to this company',
	COMPANY_DEACTIVATE:
		'Your company is deactivated. Please contact admin and try again later.',
	ACCOUNT_DEACTIVATE:
		'Your account is deactivated. Please contact admin and try again later.',
	SET_PWD:
		'Please set your password using the link shared over email and try again.',
	UNAUTHORIZED_EXCEPTION: 'Authorization header not provided',
	INVALID_TOKEN_HEADER: 'Invalid Authorization header format'
};

export const IntegrationResponses = {};
