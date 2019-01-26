import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AutenticacaoComponent } from './Login/autenticacao.component';

const routes: Routes = [
  {path: 'login', component: AutenticacaoComponent},
  { path: 'omg', loadChildren: 'src/app/pages/pages.module#PagesModule'},
  { path: '**', redirectTo: 'login' },
];
const config: ExtraOptions = {
  useHash: true,
};
@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
