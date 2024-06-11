import { randomBytes } from 'crypto'

function randomBytesFunction(length: number, characters: string): string {
	let randomString: string = ''

	const buffer: any = randomBytes(length)
	for (let i = 0; i < length; i++) {
		randomString += characters[buffer[i] % characters.length]
	}

	return randomString
}

/**
 * @description function to generate numeric OTP
 * @param otpLength
 * @returns
 */
export function generateOtp(otpLength: number = 4): string {
	const otpChars: string = '0123456789'

	let otp: string = randomBytesFunction(otpLength, otpChars)

	otp = '1234' // hardcoded for testing and development
	return otp
}

/**
 * @function generateRandomPassword
 * @description generate Alphanumeric password
 * @returns
 */
export async function generateRandomPassword() {
	const upperCase: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	const lowerCase: string = 'abcdefghijklmnopqrstuvwxyz'
	const specialCharacter: string = '!@#$%^&'
	const numbers: string = '0123456789'

	const allCharacters = upperCase + numbers + specialCharacter + lowerCase

	const randomPassword: string = randomBytesFunction(8, allCharacters)

	return randomPassword
}
