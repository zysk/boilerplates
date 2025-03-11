import { randomBytes } from 'crypto'

const OTP_CHARS: string = '0123456789'
const UPPER_CASE: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWER_CASE: string = 'abcdefghijklmnopqrstuvwxyz'
const SPECIAL_CHARACTER: string = '!@#$%^&'
const NUMBERS: string = '0123456789'
const ALL_CHARACTERS = UPPER_CASE + NUMBERS + SPECIAL_CHARACTER + LOWER_CASE

function randomBytesFunction(length: number, characters: string): string {
	let randomString: string = ''

	const buffer = randomBytes(length)
	for (let i = 0; i < length; i++) {
		randomString += characters[buffer[i] % characters.length]
	}

	return randomString
}

/**
 * @function randomString
 * @description Generate a random string of specified length from the given character set
 * @param length
 * @param chars
 * @returns
 */
function randomString(length: number, chars: string): string {
	return randomBytesFunction(length, chars)
}

/**
 * @function generateOtp
 * @description Generate a numeric OTP of specified length
 * @param otpLength
 * @returns
 */
export function generateOtp(otpLength: number = 4): string {
	return randomString(otpLength, OTP_CHARS)
}

/**
 * @function generateRandomPassword
 * @description Generate an alphanumeric password
 * @returns
 */
export function generateRandomPassword(passwordLength = 8): string {
	return randomString(passwordLength, ALL_CHARACTERS)
}
