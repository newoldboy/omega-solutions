import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { MenuComponent } from './Menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarModule, WavesModule, InputsModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule, MatButtonToggleModule, MatBadgeModule, MatInputModule, MatExpansionModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatTabsModule, MatLabel, MatTabLabel } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatStepperModule} from '@angular/material/stepper';
import { AgencaCompComponent } from './agendarCompromisso/agendarCompromisso.component';
import { ConfigCompromissoComponent } from './configCompromisso/configCompromisso.component';

const PAGES_COMPONENTS = [
  PagesComponent,
  MenuComponent,
  DashboardComponent,
  ConfigCompromissoComponent,
  AgencaCompComponent
  
];
@NgModule({
  imports: [
    MatTabsModule,
    PagesRoutingModule,
    RouterModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NavbarModule,
    WavesModule,
    InputsModule,
    MDBBootstrapModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatExpansionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {}
