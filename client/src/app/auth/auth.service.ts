import { Injectable, EventEmitter } from '@angular/core';

import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../app.setings';
import { Usuario } from '../login/usuario';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    public mensagem: string;
    
    constructor(
        private router: Router,
        private http: HttpClient
    ) { }    
    setCredenciais(token, usuario) {
        console.log(usuario);
        
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('usuario', JSON.stringify(usuario));
        
    }    

    setCredenciaisOff(body, nivel) {        
        sessionStorage.setItem('user', body['login']);
        sessionStorage.setItem('senha', body['senha']);             
        sessionStorage.setItem('nivel', nivel);
    }

    getUser() {
        const user = sessionStorage.getItem('usuario');
        return (user ? JSON.parse(user) : undefined);
    }    

    getToken() {
        const token = sessionStorage.getItem('token');
        return token;
    }    
    
    fazerLogin(usuario: Usuario) {
        console.log(usuario);
        
        const promise = new Promise((resolve, reject) => {
            this.http.post(API_CONFIG.url + 'auth/local', usuario)
            .toPromise().then(
                res => {
                    this.setCredenciais(res['token'], res['user']);
                    resolve(res);
                },
                error => reject(error),
            );
        });
        return promise;
    }
    
    fazerLogOff(){
        sessionStorage.clear();
    }

    confirmacaoCadastro(newUser: boolean, message: string){
        if (newUser === true) {
            sessionStorage.setItem('InformaçãoCadastro', message);
        } else {
            sessionStorage.setItem('InformaçãoCadastro', message);
        }
    }
    
    cadastrarUsuario(novoUsuario){
        const promise = new Promise((resolve,reject)=>{
            this.http.post(API_CONFIG.url + 'api/cadastroUsuario', novoUsuario)
            .toPromise().then(
                res => {
                    this.confirmacaoCadastro(true, 'Passou');
                    resolve(res);
                },
                error =>{
                    this.confirmacaoCadastro(false, 'Erro');
                    reject(error);
                }
            );
        });
        return promise;
    }     
    
    teste() {
        const promise = new Promise((resolve, reject) => {
            this.http.get(API_CONFIG.url + 'api/clientes')
            .toPromise().then(
                res =>
                    resolve(res),                
                error => reject(error),
            );
        });
        return promise;
    }

}

