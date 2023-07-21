import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import {
  faHome,
  faTrophy,
  faBook,
  faJournalWhills,
  faListUl,
  faComments,
  faUsers,
  faAddressCard,
  faBookOpen,
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: any;

  homeIcon = faHome;
  contestsIcon = faTrophy;
  problemsIcon = faBook;
  problemSetsIcon = faJournalWhills;
  submissionsIcon = faListUl;
  discussionIcon = faComments;
  groupsIcon = faUsers;
  usersIcon = faAddressCard;
  wikiIcon = faBookOpen;

  isCollapsed = true;

  constructor(public authService: AuthService) {}

  logout() {
    this.authService
      .logout()
      .pipe(finalize(() => (this.currentUser = null)))
      .subscribe();
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(data => {
      if (data) this.currentUser = data.user_name;
      else this.currentUser = null;
    });
  }

  ngOnDestroy(): void {}
}
