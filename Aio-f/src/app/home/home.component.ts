import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  data: any;

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.homeService.getInfo().subscribe(data => {
      this.data = data;
      console.log(data.recent_contests);
    });
  }
}
