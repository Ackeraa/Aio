import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  currentUser: string | null;
  isCollapsed = true;
  languages = environment.languages;
  currentLanguage = environment.defaultLang;

  constructor(
    private authService: AuthService,
    private translate: TranslateService
  ) {}

  changeLanguage(lang: string) {
    this.currentLanguage = lang;
    this.translate.use(lang);
  }

  logout() {
    this.authService.logout().subscribe({
      complete: () => (this.currentUser = null),
    });
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'))?.name;
  }

  ngOnDestroy(): void {}
}
