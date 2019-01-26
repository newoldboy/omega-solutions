import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-pages',
    template: `<app-menu></app-menu>
    <router-outlet></router-outlet>
    `

})
export class PagesComponent implements AfterViewInit {

    ngAfterViewInit() { }
}
