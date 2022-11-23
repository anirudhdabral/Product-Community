import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth-gaurds/admin.guard';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './user/product-details/product-details.component';
import { UserGuard } from './auth-gaurds/user.guard';
import { AddProductComponent } from './user/add-product/add-product.component';
import { AddReviewComponent } from './user/add-review/add-review.component';
import { LoginComponent } from './user/login/login.component';
import { AllProductsComponent } from './user/all-products/all-products.component';
import { SearchProductComponent } from './user/search-product/search-product.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: ''
  },
  {
    component: HomeComponent,
    path: 'home'
  },
  {
    component: LoginComponent,
    path: 'login'
  },
  {
    component: ProductDetailsComponent,
    path: 'product-details/:productCode',
    canActivate: [UserGuard]
  },
  {
    component: AddReviewComponent,
    path: 'add-review/:productCode',
    canActivate: [UserGuard]
  },
  {
    component: AdminLoginComponent,
    path: 'admin-login'
  },
  {
    component: DashboardComponent,
    path: 'admin-dashboard',
    canActivate: [AdminGuard]
  },
  {
    component: AddProductComponent,
    path: 'add-product',
    canActivate: [UserGuard]
  },
  {
    component: AllProductsComponent,
    path: 'all-products',
    canActivate: [UserGuard]
  },
  {
    component: SearchProductComponent,
    path: 'search-product/:searchType/:searchTerm',
    canActivate: [UserGuard]
  },
  {
    component: ErrorPageComponent,
    path: 'error-page'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
