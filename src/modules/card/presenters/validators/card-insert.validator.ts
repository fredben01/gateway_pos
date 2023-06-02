import { IsEmail, IsInt, IsNotEmpty, IsString, MaxLength, MinLength, Matches, Min, Max, IsIn } from 'class-validator';
import { IsValidCustomExpirationYear } from '../../../shared/custom-validators/custom-expire-year.validator';
import { IsValidCustomMonth } from '../../../shared/custom-validators/custom-months-valid.validator';
import { IsValidCustomLuhn } from '../../../shared/custom-validators/custom-luhn.validator';

export class CardInsertValidator {
  @IsInt()
  @IsNotEmpty()
  @Min(1000000000000, { message: "Must be between 13 and 16 digits" })
  @Max(9999999999999999, { message: "Must be between 13 and 16 digits" })
  @IsValidCustomLuhn()
  card_number!: number;
  @IsInt()
  @IsNotEmpty()
  @Min(100, { message: "Must be between 3 and 4 digits" })
  @Max(9999, { message: "Must be between 3 and 4 digits" })
  cvv!: number;
  @IsString()
  @MinLength(1)
  @MaxLength(2)
  @IsNotEmpty()
  @IsValidCustomMonth()
  expiration_month!: string;
  @IsString()
  @MinLength(4)
  @MaxLength(4)
  @IsNotEmpty()
  @IsValidCustomExpirationYear()
  expiration_year!: string;
  @IsString()
  @IsEmail()
  @MinLength(5)
  @MaxLength(100)
  @IsNotEmpty()
  // @Matches(RegExp('^[a-z0-9](\.?[a-z0-9]){5,}@(((gmail|hotmail)\.com)|(yahoo)\.es)'))
  @Matches(RegExp('[a-z0-9]+@(((gmail|hotmail)\.com)|(yahoo)\.es)'), {
    message: 'Solo se aceptan los dominios: gmail.com, hotmail.com, yahoo.es'
  })
  email!: string;
}