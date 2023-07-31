import { AbstractControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

export class CreateValidators {
  static memoryValidator(control: AbstractControl): { [s: string]: boolean } {
    const value = control.value;
    // Check if value is empty;
    if (!value) {
      return { required: true };
    }

    // Check if value is valid;
    if (!value.match(/^[1-9]\d*$/)) {
      return { invalid: true };
    }

    // Check if value is too large
    if (value > environment.memoryMax) {
      return { tooLarge: true };
    }
  }

  static timeValidator(control: AbstractControl): { [s: string]: boolean } {
    const value = control.value;
    // Check if value is empty;
    if (!value) {
      return { required: true };
    }

    // Check if value is valid
    if (!value.match(/^[1-9]\d*$/)) {
      return { invalid: true };
    }

    // Check if value is too large
    if (value > environment.timeMax) {
      return { tooLarge: true };
    }
  }

  static textValidator(control: AbstractControl): { [s: string]: boolean } {
    const value = control.value;
    // Check if value is empty;
    if (!value) {
      return { required: true };
    }

    // Check if value is too long
    if (value.length > environment.textMaxLen) {
      return { tooLong: true };
    }
  }
}
