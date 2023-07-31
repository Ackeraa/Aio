import { AbstractControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

export class Validators {
  static titleValidator(c: AbstractControl): { [s: string]: string } | null {
    const value = c.value;
    // Check if value is empty;
    if (!value) {
      return { error: 'is required.' };
    }

    // Check if value is too long
    if (value.length > environment.titleMaxLen) {
      return {
        error: `too long, should be less than${environment.titleMaxLen}`,
      };
    }

    return null;
  }

  static textValidator(c: AbstractControl): { [s: string]: string } | null {
    const value = c.value;
    // Check if value is empty;
    if (!value) {
      return { error: 'is required.' };
    }

    // Check if value is too long
    if (value.length > environment.textMaxLen) {
      return {
        error: `too long, should be less than${environment.textMaxLen}`,
      };
    }

    return null;
  }
}
