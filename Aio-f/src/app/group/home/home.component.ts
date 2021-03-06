import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  data: any;

  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.groupService.homeInfo$.pipe(filter((x) => x != null)).subscribe({
      next: (homeInfo) => (this.data = homeInfo),
    });
  }
}
