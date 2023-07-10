import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    currentUser: any;

    constructor(public authService: AuthService) {
    }

    logOut() {
      this.authService.logOut();
      this.currentUser = null;
    }

	ngOnInit(): void {
		this.authService.user$.subscribe(data => {
			if (data) this.currentUser = data.user_name;
			else this.currentUser = null;
		});
	}
	ngOnDestroy(): void {
	}
}
