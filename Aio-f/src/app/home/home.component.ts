import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  data: any;
  welcome: string;

  constructor(private homeService: HomeService,
              private translate: TranslateService) {

    this.translate.get('welcome').subscribe((text: string) => {
      this.welcome = text;
    });
  }

  ngOnInit() {
    this.homeService.getInfo()
    .subscribe(data => {
      this.data = data;
    });
  }

}

