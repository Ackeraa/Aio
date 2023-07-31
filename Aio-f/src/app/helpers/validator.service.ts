import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor(private translate: TranslateService) {}

  checkTitle(name:string, c: AbstractControl): { [s: string]: string } | null {
    const value = c.value;
    // Check if value is empty;
    if (!value) {
      return {
        error: this.translate.instant('errors.required', {
          v1: this.translate.instant(name),
        }),
      };
    }

    // Check if value is too long
    if (value.length > environment.titleMaxLen) {
      return {
        error: this.translate.instant('errors.tooLong', {
          v1: this.translate.instant(name),
          v2: environment.titleMaxLen,
        }),
      };
    }

    return null;
  }

  checkContent(name: string, c: AbstractControl): { [s: string]: string } | null {
    const value = c.value;
    // Check if value is empty;
    if (!value) {
      return {
        error: this.translate.instant('errors.required', {
          v1: this.translate.instant(name),
        }),
      };
    }

    // Check if value is too long
    if (value.length > environment.contentMaxLen) {
      return {
        error: this.translate.instant('errors.tooLong', {
          v1: this.translate.instant(name),
          v2: environment.contentMaxLen,
        }),
      };
    }

    return null;
  }
}
