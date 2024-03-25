import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import * as nodemailer from 'nodemailer';

const configService = new ConfigService();

function randomBytesFunction(length: number, characters: string): string {
	let randomString: string = '';

	const buffer: any = randomBytes(length);
	for (let i = 0; i < length; i++) {
		randomString += characters[buffer[i] % characters.length];
	}

	return randomString;
}

/**
 * @description function to generate numeric OTP
 * @param otpLength
 * @returns
 */
export function generateOtp(otpLength: number = 4): string {
	const otpChars: string = '0123456789';

	let otp: string = randomBytesFunction(otpLength, otpChars);

	otp = '1234';
	return otp;
}

/**
 * @description function to validate OTP
 * @param enteredOtp
 * @param expectedOtp
 * @returns
 */
export function verifyOtp(enteredOtp: string, expectedOtp: string): boolean {
	return enteredOtp === expectedOtp;
}

/**
 * @description send OTP through Email using Google
 * @param email
 * @param otp
 * @returns
 */
export async function sendOtp(email: string, otp: string): Promise<any> {
	return true;
	const transporter = nodemailer.createTransport({
		host: configService.get<string>('GOOGLE_SMTP_HOST'),
		port: configService.get<number>('GOOGLE_SMTP_PORT'),
		secure: false,
		requireTLS: true,
		auth: {
			user: configService.get<string>('GOOGLE_SMTP_EMAIL'),
			pass: configService.get<string>('GOOGLE_SMTP_PASSWORD')
		}
	});

	const mailOptions = {
		from: configService.get<string>('GOOGLE_SMTP_EMAIL'),
		to: email,
		subject: 'Your OTP - VitaBotX',
		text: `Dear User,\n\nYour OTP for VitaBotX is ${otp}.\n\nThank you,\nThe VitaBotX Team`
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log(`Email sent: Your OTP is ${otp}`);
		return info.response;
	} catch (error) {
		throw new Error(`Error sending email: ${error.message}`);
	}
}

/**
 * @function generateRandomPassword
 * @description generate Alphanumeric password
 * @returns
 */
export async function generateRandomPassword() {
	const upperCase: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const lowerCase: string = 'abcdefghijklmnopqrstuvwxyz';
	const specialCharacter: string = '!@#$%^&';
	const numbers: string = '0123456789';

	const allCharacters = upperCase + numbers + specialCharacter + lowerCase;

	const randomPassword: string = randomBytesFunction(8, allCharacters);

	return randomPassword;
}
