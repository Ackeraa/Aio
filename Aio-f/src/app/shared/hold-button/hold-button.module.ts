import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoldButtonComponent } from './hold-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [HoldButtonComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [HoldButtonComponent],
})
export class HoldButtonModule {}
