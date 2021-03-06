import { Injectable} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../app.setings';

@Injectable({
    providedIn: 'root'
})
export class AgendaCompService {
    
    constructor(private http: HttpClient) { }

    listaCliente() {
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
