import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoutesInterceptor } from '../auth/routes.interceptor';
import { AgencaCompComponent } from './agendarCompromisso/agendarCompromisso.component';
import { ConfigCompromissoComponent } from './configCompromisso/configCompromisso.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'config-comp', component: ConfigCompromissoComponent},
    {path: 'agenda-comp', component: AgencaCompComponent},       
    // {path: 'agenda-comp', component: AgencaCompComponent, canActivate: [RoutesInterceptor]},            
    {path: '**', redirectTo: 'dashboard'}
  ],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
