import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsStringOrStringArray(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isStringOrStringArray',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value === 'string') {
            return true;
          }
          if (
            Array.isArray(value) &&
            value.every((item) => typeof item === 'string')
          ) {
            return true;
          }
          return false;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a string or an array of strings`;
        },
      },
    });
  };
}
