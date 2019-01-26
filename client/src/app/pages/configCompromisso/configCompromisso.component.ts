import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, FormControlName, Validators } from '@angular/forms';
import { ComfigCompService } from './configCompromisso.service';



@Component({
  selector: 'app-config-comp',
  templateUrl: './configCompromisso.component.html',
  styleUrls: ['./configCompromisso.component.scss'],
  providers:[ComfigCompService]
})

export class ConfigCompromissoComponent implements OnInit{
  
  public form: FormGroup;

  constructor(private configService: ComfigCompService,private router: Router, private formBuilder : FormBuilder){
    this.form = this.formBuilder.group({
      descricao: ['',Validators.required],
    });
  }
  
  ngOnInit() { 
    this.saveCompromisso()
  }

  saveCompromisso() {
    var txt;
    txt.getOutputStream()
    txt.setContentType("application/octet-stream");
    txt.addHeader("Content-Disposition", "attachment; filename=../../../../../client/src/compromisso.txT;");
    console.log(txt);
    
  }

}
