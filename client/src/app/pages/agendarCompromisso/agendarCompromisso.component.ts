import { Component, OnInit } from '@angular/core';

import {AgendaCompService} from './agendarCompromisso.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, FormControlName, Validators } from '@angular/forms';
import { del } from 'selenium-webdriver/http';


@Component({
  selector: 'app-agendar-comp',
  templateUrl: './agendarCompromisso.component.html',
  styleUrls: ['./agendarCompromisso.component.scss']
})

export class AgencaCompComponent implements OnInit{

  public tipos = [
    {name: 'Centro', value: 1},
    {name: 'Mercado', value: 2},
    {name: 'Compromisso', value: 3},
  ]
  public listAcao = []
  public lista = [];
  public checked = false;
  public mercadoList = false;
  public centroList = false;
  public form: FormGroup;
  public selectList = false;
  public tipoList = '';
  public listCreate = false;

  constructor(private listaCliente: AgendaCompService,private router: Router, private formBuilder : FormBuilder){
    this.form = this.formBuilder.group({
      tipo: [Validators.required],
      qtd: ['', Validators.required],
      acao: ['', [Validators.required]],
      // password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  
  ngOnInit() {}

  setList() {
    this.selectList = true;
    this.tipoList = this.form.controls['tipo'].value;
  }
  
  addLista() {
    if (this.form.controls['acao'].value !== '') {
      this.listAcao.push({name :this.form.controls['acao'].value, qtd: this.form.controls['qtd'].value});
    } else {
      this.listAcao.push({name :this.form.controls['acao'].value});
    }    
  }

  clear() {
    this.form.reset();
    this.listAcao = []
  }

  Check(num, check) {
    console.log(num, check);
    
  }

  clearList(row) {
      console.log(row);      
      for (let i = 0; i < this.listAcao.length; i++) {
        if (this.listAcao[i]['name'] = row) {
          delete this.listAcao[i]['name'];
          break;
        }
      }
      console.log(this.listAcao);   
  }

  save() {
    this.lista.push({
      Tipo: this.form.controls['tipo'].value,   
      itens : [{
        name: this.form.controls['acao'].value,
        quantidade: this.form.controls['qtd'].value,
      }]   
    })
    this.listCreate = true;
  }

}
