import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";

@ValidatorConstraint()
class CustomMonthsValid implements ValidatorConstraintInterface {

  constructor(private validMonths: string[]) {
    this.validMonths = [];
    for (let i = 1; i <= 12; i++) {
      if(i <= 9) { 
        this.validMonths.push(i.toString());
        this.validMonths.push('0'+i.toString());
        continue;
      }

      this.validMonths.push(i.toString());
    }
  }

  validate(textMonth: string, args: ValidationArguments) {
    return (this.validMonths.includes(textMonth)) ? true : false;
  }

  defaultMessage(validationArguments?: ValidationArguments | undefined): string {
    return `The month must belong to the list ${this.validMonths}`;
  }
}

export function IsValidCustomMonth(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CustomMonthsValid,
    });
  }
}