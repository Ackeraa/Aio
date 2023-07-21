import { AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { environment } from '../../environments/environment';

export class AuthValidators {
  static nameValidator(name: FormControl): { [s: string]: boolean } | null {
    const regex = new RegExp(/^[a-zA-Z][a-zA-Z0-9_]*$/);
    if (!name.value.match(regex)) {
      return { invalidName: true };
    }
  }

  static emailValidator(email: FormControl): { [s: string]: boolean } | null {
    const value = email.value;
    if (!value) {
      return null;
    }
    const regex = new RegExp(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i);
    if (!value.match(regex)) {
      return { invalidEmail: true };
    }
  }

  static lengthValidator(minLength: number, maxLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      // Return if value is empty;
      if (!value) {
        return null;
      }

      if (value.length < minLength) {
        return { tooShort: true };
      } else if (value.length > maxLength) {
        return { tooLong: true };
      }

      return null;
    };
  }

  static nameLengthValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    return AuthValidators.lengthValidator(
      environment.unameMinLen,
      environment.unameMaxLen
    )(control);
  }

  static passwordLengthValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    return AuthValidators.lengthValidator(
      environment.passwdMinLen,
      environment.passwdMaxLen
    )(control);
  }
}
