import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../app.setings';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  constructor(private http:HttpClient) { }
  
  save(){
    const promise = new Promise((resolve, reject) => {
      this.http.get(API_CONFIG.url + 'api/solicitacoes/')
      .toPromise().then(
        res =>
        resolve(res),                
        error => reject(error),
      );
    });        
    return promise;
  } 
}

