import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-config-usuario',
  templateUrl: './configUsuario.component.html',
  styleUrls: ['./configUsuario.component.scss']
  
})
export class ConfiguracaoUserComponent implements OnInit {
  niveis: Nivel[] = [
    {value: 'A', viewValue: 'Administrador'},
    {value: 'U', viewValue: 'Usuario'}
  ];
  public cadastro = sessionStorage.getItem('InformaçãoCadastro');
  public hide = true;
  public FormUser: FormGroup;
  public password = true;
  public messageOK = 'Usuario Cadastro!';
  public messageErr = 'Ocorreu um Erro no cadastro!';
  
  constructor(private fb:FormBuilder,private authService: AuthService,public snackBar: MatSnackBar) {
    this.FormUser = fb.group({
      nome: ['', Validators.required],
      usuario: ['', Validators.required],
      senha: ['', Validators.required],
      nivel: ['', Validators.required],
      email:['', Validators.required]
    });
  }  
  ngOnInit() {
  }
  cadastrarUser() {
    this.authService.cadastrarUsuario(this.FormUser.value)
    .then((response) => {
      if (this.cadastro === 'Passou') {
        this.confirmaCadastro(true, 'Ops, Ocorreu um Erro no Cadastro.', '');
      }else{             
        this.confirmaCadastro(true, 'Usuario Cadastrado', '');
      }
    })
    .catch((err) => {
    });
  }
  confirmaCadastro(newUser: boolean, message: string, action:string){
    if (newUser === true) {
      this.snackBar.open(message,action, {duration: 2000,});
    } else {
      this.snackBar.open(message,action, {duration: 2000,});     
    }    
  }
}
export interface Nivel {
  value: string;
  viewValue: string;
}
