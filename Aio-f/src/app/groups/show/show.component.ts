import { Component, Input } from '@angular/core';
import { GroupsService } from '../groups.service';
import { AlertService, SearchParams } from '../../shared';

enum Permission {
  MODIFY = 'MODIFY',
  JOIN = 'JOIN',
  LEAVE = 'LEAVE',
  NONE = 'NONE',
}

@Component({
  selector: 'app-groups-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent {
  @Input() which: string;
  groups: Array<any>;
  p: number;
  total: number;
  user: any;
  Permission = Permission;

  constructor(
    private groupsService: GroupsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getGroups(this.groupsService.getGroupsPage());
  }

  getGroups(params: SearchParams): void {
    this.p = params.page;
    params.addition = { which: this.which };
    this.groupsService
      .getGroups(params)
      .subscribe({
        next: (data) => {
          this.groups = data.groups;
          this.total = data.total;
        },
        error: (err) => {
          this.alertService.error(`${err.status} ${err.statusText}`);
        },
      });
  }

  joinGroup(id: number): void {
    this.groupsService.joinGroup(id).subscribe({
      next: () => {
        this.alertService.success('Joined successfully');
      },
      error: (err) => {
        this.alertService.error(`${err.status} ${err.statusText}`);
      }
    });
  }

  leaveGroup(id: number): void {
    this.groupsService.leaveGroup(id).subscribe({
      next: () => {
        this.alertService.success('Left successfully');
      },
      error: (err) => {
        this.alertService.error(`${err.status} ${err.statusText}`);
      }
    });
  }

  getPermission(creator: string): Permission {
    if (this.user.role === 'admin' || this.user.name === creator) {
      return Permission.MODIFY;
    } else if (this.which === 'public') {
      return Permission.JOIN;  // FIXME: maybe already joined
    } else if (this.which === 'private') {
      return Permission.LEAVE;
    } else {
      return Permission.NONE;
    }
  }
}
