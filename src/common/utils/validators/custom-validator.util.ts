import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions
} from 'class-validator';

/**
 * @method IsEqualTo
 * @param property
 * @param validationOptions
 * @returns
 */
export function IsEqualTo(
	property: string,
	validationOptions?: ValidationOptions
) {
	return (object: any, propertyName: string) =>
		registerDecorator({
			name: 'isEqualTo',
			target: object.constructor,
			propertyName,
			constraints: [property],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					const [relatedPropertyName] = args['constraints'];
					const relatedValue = (args['object'] as any)[
						relatedPropertyName
					];
					return value === relatedValue;
				},
				defaultMessage(args: ValidationArguments) {
					const [relatedPropertyName] = args['constraints'];
					return `"${args['property']}" must match "${relatedPropertyName}" exactly`;
				}
			}
		});
}

/**
 * @method IsLessThenOrEqual
 * @param property
 * @param validationOptions
 * @returns
 */
export function IsLessThenOrEqual(
	property: string,
	validationOptions?: ValidationOptions
) {
	return (object: any, propertyName: string) =>
		registerDecorator({
			name: 'isLessThenOrEqual',
			target: object.constructor,
			propertyName,
			constraints: [property],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					const [relatedPropertyName] = args['constraints'];
					const relatedValue = (args['object'] as any)[
						relatedPropertyName
					];
					return value <= relatedValue;
				},
				defaultMessage(args: ValidationArguments) {
					const [relatedPropertyName] = args['constraints'];
					return `"${args['property']}" should be less then "${relatedPropertyName}"`;
				}
			}
		});
}
