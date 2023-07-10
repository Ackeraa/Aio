import { Component } from '@angular/core';
import { environment } from "../environments/environment";
import { Router } from '@angular/router';

import { User } from './users';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  currentUser: User;

  constructor(private router: Router) {
  }
}

/*
declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}
*/
