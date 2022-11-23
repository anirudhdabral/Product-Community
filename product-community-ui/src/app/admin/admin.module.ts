import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    AdminLoginComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,FormsModule, ReactiveFormsModule
  ]
})
export class AdminModule { }
