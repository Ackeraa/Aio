import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { GroupsService } from '../groups.service';
import { AlertService, SearchParams } from '../../shared';

@Component({
  selector: 'app-groups-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent {
  url: string = 'groups';
  groups: Array<any>;
  loading: boolean;
  p: number;
  total: number;

  constructor(
    private groupsService: GroupsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getGroups(this.groupsService.getGroupsPage());
  }

  getGroups(params: SearchParams): void {
    this.p = params.page;
    this.loading = true;
    this.groupsService
      .getGroups(params)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => {
          this.groups = data.groups;
          this.total = data.total;
        },
        error: (err) => {
          this.alertService.error(err);
        },
      });
  }
}
