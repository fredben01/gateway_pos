import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";

@ValidatorConstraint()
class CustomLuhnValid implements ValidatorConstraintInterface {
  validate(value: number, validationArguments?: ValidationArguments | undefined): boolean | Promise<boolean> {
    return this.luhnAlgorithm(value) ? true : false;
  }
  defaultMessage?(validationArguments?: ValidationArguments | undefined): string {
    return "It is not a valid card";
  }

  private luhnAlgorithm (value: number) {
    let arr = (value + '')
            .split('')
            .reverse()
            .map(x => parseInt(x));

    let lastDigit = arr.splice(0, 1)[0];
    let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);
    sum += lastDigit;
    return sum % 10 === 0;
  }
}

export function IsValidCustomLuhn(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CustomLuhnValid,
    });
  }
}
