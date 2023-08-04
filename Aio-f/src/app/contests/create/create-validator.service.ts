import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class CreateValidatorService {
  constructor(private translate: TranslateService) {}

  checkMemory(control: AbstractControl): { [s: string]: string } | null {
    const value = control.value;
    // Check if value is empty;
    if (!value) {
      return {
        error: this.translate.instant('errors.required', {
          v1: this.translate.instant('problems.memoryLimit'),
        }),
      };
    }

    // Check if value is valid;
    if (!value.match(/^[1-9]\d*$/)) {
      return {
        error: this.translate.instant('errors.invalid', {
          v1: this.translate.instant('problems.memoryLimit'),
        }),
      };
    }

    // Check if value is too large
    if (value > environment.memoryMax) {
      return {
        error: this.translate.instant('errors.tooLarge', {
          v1: this.translate.instant('problems.memoryLimit'),
          v2: environment.memoryMax,
        }),
      };
    }

    return null;
  }

  checkTime(control: AbstractControl): { [s: string]: string } | null {
    const value = control.value;
    // Check if value is empty;
    if (!value) {
      return {
        error: this.translate.instant('errors.required', {
          v1: this.translate.instant('problems.timeLimit'),
        }),
      };
    }

    // Check if value is valid
    if (!value.match(/^[1-9]\d*$/)) {
      return {
        error: this.translate.instant('errors.invalid', {
          v1: this.translate.instant('problems.timeLimit'),
        }),
      };
    }

    // Check if value is too large
    if (value > environment.timeMax) {
      return {
        error: this.translate.instant('errors.tooLarge', {
          v1: this.translate.instant('problems.timeLimit'),
          v2: environment.timeMax,
        }),
      };
    }

    return null;
  }
}
