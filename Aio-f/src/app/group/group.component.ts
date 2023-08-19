import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from './group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent {
  photo: string = "ad";

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id') || null;
    this.groupService.getInfo(id);
  }

  getMembers(): void {
    this.groupService.getMembers();
  }

  getContests(): void {
    this.groupService.getContests();
  }

  getProblemSets(): void {
    this.groupService.getProblemSets();
  }
}
