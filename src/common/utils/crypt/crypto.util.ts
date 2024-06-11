import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY // 32 bytes for AES-256   64 characters long, which is 32 bytes

const ALGORITHM = 'aes-256-cbc'
const IV_LENGTH = 16

export const encrypt = (text: string): string => {
	const iv = randomBytes(IV_LENGTH)
	const cipher = createCipheriv(
		ALGORITHM,
		Buffer.from(ENCRYPTION_KEY, 'hex'),
		iv
	)
	const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
	return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

export const decrypt = (text: string): string => {
	const textParts = text.split(':')
	const iv = Buffer.from(textParts.shift(), 'hex')
	const encryptedText = Buffer.from(textParts.join(':'), 'hex')
	const decipher = createDecipheriv(
		ALGORITHM,
		Buffer.from(ENCRYPTION_KEY, 'hex'),
		iv
	)
	const decrypted = Buffer.concat([
		decipher.update(encryptedText),
		decipher.final()
	])
	return decrypted.toString()
}
