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
  
  public listAcao = []
  public listMercado = [{
    name: 'Mercado',
    codigo: 1,
    items: [
      {nome: 'ovo', qtd: 12},
      {nome: 'coca', qtd: 1},
      {nome: 'pao', qtd: 9},
      {nome: 'carne', qtd: 2}
    ]
  }];
  public tipos = [
    {name: 'Centro', value: 1},
    {name: 'Mercado', value: 2},
    {name: 'Compromisso', value: 3},
  ]
  public listCentro = [{
    name: 'Centro',
    codigo: 2,
    items: [
      {nome: 'Havan', qtd: 12, desc: 'Pagar'},
      {nome: 'Caixa', qtd: 1, desc: 'Sacar'},
      {nome: 'Farmacia', qtd: 9, desc: 'Paracacetemol'}
    ]
  }];
  public checked = false;
  public mercadoList = false;
  public centroList = false;
  public form: FormGroup;

  constructor(private listaCliente: AgendaCompService,private router: Router, private formBuilder : FormBuilder){
    this.form = this.formBuilder.group({
      tipo: [Validators.required],
      data: [Validators.required],
      acao: ['', [Validators.required]],
      // password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  
  ngOnInit() {
    this.setListas();
  }
  
  setListas() {
    this.mercadoList = false;
    this.centroList = false;
    if (this.listCentro  !== []) {
      this.centroList = true;
    };
    if (this.listMercado !== []) {
      this.mercadoList = true;
    };
  }

  addLista() {
    this.listAcao.push({name :this.form.controls['acao'].value});
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
          this.listAcao.slice(i, row)
          break;
        }
      }
      console.log(this.listAcao);   
  }


}
