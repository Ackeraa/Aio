import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthValidatorService {
  constructor(private translate: TranslateService) {}

  checkName(c: AbstractControl): { [s: string]: string } | null {
    // Check if value is empty;
    const value = c.value;
    if (!value) {
      return {
        error: this.translate.instant('errors.required', {
          v1: this.translate.instant('auth.username'),
        }),
      };
    }

    // Check if value is valid
    const regex = new RegExp(/^[a-zA-Z][a-zA-Z0-9_]*$/);
    if (!value.match(regex)) {
      return {
        error: this.translate.instant('errors.invalid', {
          v1: this.translate.instant('auth.name'),
        }),
      };
    }

    // Check if value is too short or too long
    return this.checkLength(
      environment.unameMinLen,
      environment.unameMaxLen
    )(c);
  }

  checkEmail(c: AbstractControl): { [s: string]: string } | null {
    const value = c.value;
    // Check if value is empty;
    if (!value) {
      return {
        error: this.translate.instant('errors.required', {
          v1: this.translate.instant('auth.email'),
        }),
      };
    }

    // Check if value is valid
    const regex = new RegExp(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i);
    if (!value.match(regex)) {
      return {
        error: this.translate.instant('errors.invalid', {
          v1: this.translate.instant('auth.email'),
        }),
      };
    }

    return null;
  }

  checkPassword(c: AbstractControl): { [s: string]: string } | null {
    // Check if value is empty;
    const value = c.value;
    if (!value) {
      return {
        error: this.translate.instant('errors.required', {
          v1: this.translate.instant('auth.password'),
        }),
      };
    }

    // Check if value is too short or too long
    return this.checkLength(
      environment.passwdMinLen,
      environment.passwdMaxLen
    )(c);
  }

  checkLength(minLength: number, maxLength: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: string } | null => {
      const value = c.value;
      if (value.length < minLength) {
        return {
          error: this.translate.instant('errors.tooShort', {
            v1: this.translate.instant('auth.password'),
            v2: environment.passwdMinLen,
          }),
        };
      } else if (value.length > maxLength) {
        return {
          error: this.translate.instant('errors.tooLong', {
            v1: this.translate.instant('auth.password'),
            v2: environment.passwdMinLen,
          }),
        };
      }

      return null;
    };
  }
}
