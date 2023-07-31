import { AbstractControl, ValidatorFn } from '@angular/forms';
import { environment } from 'src/environments/environment';

export class AuthValidators {
  static nameValidator(c: AbstractControl): { [s: string]: string } | null {
    // Check if value is empty;
    const value = c.value;
    if (!value) {
      return { error: 'errors.required' };
    }

    // Check if value is valid
    const regex = new RegExp(/^[a-zA-Z][a-zA-Z0-9_]*$/);
    if (!value.match(regex)) {
      return { error: 'errors.invalid' };
    }

    // Check if value is too short or too long
    return AuthValidators.lengthValidator(
      environment.unameMinLen,
      environment.unameMaxLen
    )(c);
  }

  static emailValidator(c: AbstractControl): { [s: string]: string } | null {
    const value = c.value;
    // Check if value is empty;
    if (!value) {
      return { error: 'errors.required' };
    }

    // Check if value is valid
    const regex = new RegExp(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i);
    if (!value.match(regex)) {
      return { error: 'errors.invalid' };
    }

    return null;
  }

  static passwordValidator(c: AbstractControl): { [s: string]: string } | null {
    // Check if value is empty;
    const value = c.value;
    if (!value) {
      return { empty: 'errors.required' };
    }

    // Check if value is too short or too long
    return AuthValidators.lengthValidator(
      environment.passwdMinLen,
      environment.passwdMaxLen
    )(c);
  }

  static lengthValidator(minLength: number, maxLength: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: string } | null => {
      const value = c.value;
      if (value.length < minLength) {
        return {
          error: 'errors.tooShort',
          v1: 'auth.password',
          v2: environment.passwdMinLen.toString(),
        };
      } else if (value.length > maxLength) {
        return { error: 'errors.tooLong' };
      }

      return null;
    };
  }
}
