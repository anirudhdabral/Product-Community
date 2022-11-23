import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../model/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = "http://localhost:8582/product"

  constructor(private http: HttpClient, private router: Router) { }

  getProducts(): Observable<Product> {
    return this.http.get<Product>(this.url + "/getProducts")
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url + "/addProduct", product)
  }

  getCurrentProduct(code: string): Observable<Product> {
    return this.http.get<Product>(this.url + "/" + code);
  }

  searchProduct(type: string, query: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + "/search/" + type + "/" + query);
  }

}

