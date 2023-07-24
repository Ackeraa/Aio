import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: string | null;
  isCollapsed = true;

  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout().subscribe({
      complete: () => (this.currentUser = null),
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((data) => {
      this.currentUser = data ? data.user_name : null;
    });
  }

  ngOnDestroy(): void {}
}
