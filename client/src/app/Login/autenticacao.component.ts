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
  public selectList = false;
  
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
    this.authService.teste()
    .then((response) => {
      console.log(response);      
    })
    .catch((err) => {
      console.log(err);
    });
    // if (this.cardForm.controls['login'].value === 'tere' && this.cardForm.controls['senha'].value === '123') {
    //   this.authService.setCredenciaisOff(this.cardForm.value, 2)
    //   this.router.navigate(['./omg/dashboard']);
    // } else {
    //   if (this.cardForm.controls['login'].value === 'admin@admin' && this.cardForm.controls['senha'].value === 'admin') {
    //     this.authService.setCredenciaisOff(this.cardForm.value, 1)
    //     this.router.navigate(['./omg/dashboard']);
    //   }else {
    //     if (this.cardForm.controls['login'].value === 'user' && this.cardForm.controls['senha'].value === 'user') {
    //       this.authService.setCredenciaisOff(this.cardForm.value, 3)
    //       this.router.navigate(['./omg/dashboard']);
    //     }
    //   } 
    // }    
    // this.authService.fazerLogin(this.cardForm.value)
    // .then((response) => {
    //   if (response['token']) {
    //     this.router.navigate(['./omg/dashboard']);
    //   }
    // })
    // .catch((err) => {
    //   console.log(err);
    //   this.messagemErro();
    // });    
  }
  
  messagemErro(){
    this.mensagem = 'Usuario ou senha incorreto.';
  }   
}
