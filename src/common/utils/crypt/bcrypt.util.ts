import * as bcrypt from 'bcrypt';
import { RegEx } from '../consts/variables.const';

export const decryptBase64 = (str: string) => {
	// return Buffer.from(str, 'base64').toString();
	return str;
};

export function encodePassword(pwd: string) {
	const SALT = bcrypt.genSaltSync();
	const decodeBase64Pwd = decryptBase64(pwd);
	return bcrypt.hashSync(decodeBase64Pwd, SALT);
}

export function comparePassword(pwd: string, dbPwd: string) {
	const decodeBase64Pwd = decryptBase64(pwd);
	return bcrypt.compareSync(decodeBase64Pwd, dbPwd);
}

export function isValidPassword(pwd: string) {
	const decodeBase64Pwd = decryptBase64(pwd) || '';
	const pwdRegex = new RegExp(RegEx.PWD);
	return pwd && pwdRegex.test(decodeBase64Pwd);
}

export function isValidPasswordWithoutRegex(pwd: string) {
	const decodeBase64Pwd = decryptBase64(pwd) || '';
	return pwd && decodeBase64Pwd;
}
