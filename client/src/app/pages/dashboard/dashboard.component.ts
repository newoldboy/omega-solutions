import { Component, OnInit } from '@angular/core';
import {DashboardService} from './dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {
  
  constructor(private dashboard:DashboardService) {
  }
  
  ngOnInit() {} 


  saveLog(){
    this.dashboard.save()
    .then((response: object[]) => {
      console.log(response);
    }, (err) => {
      console.log(err);
    });
  }
}

