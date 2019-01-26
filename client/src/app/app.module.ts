import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule, MatMenuModule, MatToolbarModule, MatButtonToggleModule, MatFormFieldModule, MAT_DATE_LOCALE} from '@angular/material';

import { AppRoutingModule} from './app.routing';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RoutesInterceptor } from './auth/routes.interceptor';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { AutenticacaoComponent } from './Login/autenticacao.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [    
    AppComponent,    
    AutenticacaoComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,    
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatFormFieldModule
  ],
  providers: [AuthService, RoutesInterceptor, { provide: APP_BASE_HREF, useValue: '/' },{ provide: MAT_DATE_LOCALE, useValue: 'pt-Br' }],
  bootstrap: [AppComponent],  
  schemas: [ NO_ERRORS_SCHEMA],
})
export class AppModule { }
