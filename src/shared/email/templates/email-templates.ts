export const generateHelloEmailTemplate = (
	firstName: string
): {
	subject: string
	body: string
} => {
	const subject = 'Hello'
	const body = `<p>Hello ${firstName}</p>`
	return { subject, body }
}
