import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import moment from "moment";


@ValidatorConstraint()
class CustomExpirationYear implements ValidatorConstraintInterface {

  constructor(private currentYear: number, private limitYear:number) {}

  validate(textYear: string, args: ValidationArguments) {
    const year = parseInt(textYear);
    this.currentYear = moment().year();
    this.limitYear = moment().add(5,'y').year();

    if ( year >= this.currentYear && year <= this.limitYear ) return true;

    return false;
  }

  defaultMessage(validationArguments?: ValidationArguments | undefined): string {
      return `The year must be between ${this.currentYear} and ${this.limitYear}`;
  }
}

export function IsValidCustomExpirationYear(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CustomExpirationYear,
    });
  }
}