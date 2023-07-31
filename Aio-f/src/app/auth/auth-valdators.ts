import { AbstractControl, ValidatorFn } from '@angular/forms';
import { environment } from 'src/environments/environment';

export class AuthValidators {
  static nameValidator(control: AbstractControl): { [s: string]: boolean } {
    // Check if value is empty;
    const value = control.value;
    if (!value) {
      return { required: true };
    }

    // Check if value is valid
    const regex = new RegExp(/^[a-zA-Z][a-zA-Z0-9_]*$/);
    if (!value.match(regex)) {
      return { invalid: true };
    }

    // Check if value is too short or too long
    return AuthValidators.lengthValidator(
      environment.unameMinLen,
      environment.unameMaxLen
    )(control);
  }

  static emailValidator(control: AbstractControl): { [s: string]: boolean } {
    const value = control.value;
    // Check if value is empty;
    if (!value) {
      return { empty: true };
    }

    // Check if value is valid
    const regex = new RegExp(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i);
    if (!value.match(regex)) {
      return { invalidEmail: true };
    }
  }

  static passwordValidator(control: AbstractControl): { [s: string]: boolean } {
    // Check if value is empty;
    const value = control.value;
    if (!value) {
      return { empty: true };
    }

    // Check if value is too short or too long
    return AuthValidators.lengthValidator(
      environment.passwdMinLen,
      environment.passwdMaxLen
    )(control);
  }

  static lengthValidator(minLength: number, maxLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const value = control.value;
      if (value.length < minLength) {
        return { tooShort: true };
      } else if (value.length > maxLength) {
        return { tooLong: true };
      }

      return null;
    };
  }
}
