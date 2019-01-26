import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../auth/auth.service';
import { Usuario } from './usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.scss']
})
export class AutenticacaoComponent implements OnInit {
  
  private usuario: Usuario = new Usuario();
  public mensagem: string;  
  public cardForm: FormGroup;
  public password = true;
  
  constructor(private authService: AuthService,private fb: FormBuilder,private router: Router) {    
    this.cardForm = fb.group({
      login: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }
  
  ngOnInit(){
    const user = this.authService.getUser();
    if (user) {
      this.router.navigate(['./omg/dashboard']);
    }
  }
  fazerLogin() {    
    this.authService.fazerLogin(this.cardForm.value)
    .then((response) => {
      if (response['token']) {
        this.router.navigate(['./omg/dashboard']);
      }
    })
    .catch((err) => {
      console.log(err);
      this.messagemErro();
    });    
  }
  messagemErro(){
    this.mensagem = 'Usuario ou senha incorreto.';
  }   
}
