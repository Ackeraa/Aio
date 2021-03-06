import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { User } from './users';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  currentUser: User;
  title = 'Aio-f';

  constructor(private router: Router, private translate: TranslateService) {
    translate.setDefaultLang(environment.defaultLang);
    translate.use(environment.defaultLang);
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
