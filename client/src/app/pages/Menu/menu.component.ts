import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})


export class MenuComponent implements OnInit {
  
  constructor(private router: Router) { }
  
  ngOnInit(){     
  }

  // dashboard
  getDashboard(){
    this.router.navigate(['./omg/']);
  }

  // sair
  logOff(){   
    sessionStorage.clear();    
    this.router.navigate(['./login']);
  }

  // cadastros
  getAgendaCompromisso(){   
    this.router.navigate(['./omg/agenda-comp']);
  }

  // configurações
  getConfigCompromisso(){   
    this.router.navigate(['./omg/config-comp']);
  }
  
}





