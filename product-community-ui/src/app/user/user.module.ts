import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from '../app-routing.module';
import { AddReviewComponent } from './add-review/add-review.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { SearchProductComponent } from './search-product/search-product.component';



@NgModule({
  declarations: [
    LoginComponent,
    AddReviewComponent,
    AddProductComponent,
    AllProductsComponent,
    SearchProductComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class UserModule { }
