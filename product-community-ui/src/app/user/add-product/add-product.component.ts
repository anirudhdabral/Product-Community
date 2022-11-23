import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Validators, FormControl, FormGroup } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.sass']
})
export class AddProductComponent implements OnInit {
  newProduct = new Product();
  isPresent: boolean = false;
  allProducts: any = []

  constructor(private productService: ProductService, private router: Router) { }

  addProductForm = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
    brand: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    image: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    description: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(400)])
  })

  ngOnInit(): void {
    this.productService.getProducts().subscribe((result) => {
      this.allProducts = result
    });
  }

  onSubmit() {
    this.productService.getCurrentProduct(this.addProductForm.value.code as string).subscribe((result: any) => {
      if (result === null) {
        var priceString: string = this.addProductForm.value.price as string
        var priceNumber: number = +priceString
        this.newProduct.productCode = this.addProductForm.value.code as string
        this.newProduct.productName = this.addProductForm.value.name as string
        this.newProduct.productBrand = this.addProductForm.value.brand as string
        this.newProduct.productDescription = this.addProductForm.value.description as string
        this.newProduct.image = this.addProductForm.value.image as string
        this.newProduct.productPrice = priceNumber
        this.productService.addProduct(this.newProduct).subscribe((data: any) => {
          this.newProduct = data
          this.navigateToAllProducts();
          this.isPresent = false
        }, (error) => {
          this.router.navigate(['error-page'])
        });
      }
      else {
        this.isPresent = true
      }
    }, (error) => {
      this.router.navigate(['error-page'])
    });
  }

  navigateToAllProducts() {
    this.router.navigate(['all-products'])
  }

  get validCode() { return this.addProductForm.get('code') }
  get validBrand() { return this.addProductForm.get('brand') }
  get validName() { return this.addProductForm.get('name') }
  get validImage() { return this.addProductForm.get('image') }
  get validPrice() { return this.addProductForm.get('price') }
  get validDescription() { return this.addProductForm.get('description') }

}