import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: any;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getInfo()
    .subscribe(data => {
      this.data = data;
    });
  }

}

