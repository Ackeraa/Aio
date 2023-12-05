import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from './group.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent {
  photo: string = 'ad';
  baseUrl = environment.token_auth_config.apiBase;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.photo = `${this.baseUrl}/groups/${id}/get_photo`;
    this.groupService.getInfo(id);
  }
}
