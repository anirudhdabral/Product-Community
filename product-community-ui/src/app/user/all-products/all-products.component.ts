import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.sass']
})
export class AllProductsComponent implements OnInit {
  color: string = 'card purple'
  noProducts: boolean = false
  allProducts: any = []

  constructor(private router: Router, private productSerivice: ProductService) { }

  ngOnInit(): void {
    this.productSerivice.getProducts().subscribe((result) => {
      this.allProducts = result
      if (this.allProducts.length === 0) {
        this.noProducts = true
      }
    }, (error) => {
      this.router.navigate(['error-page'])
    });
  }

  randomColor() {
    const colors = ["card purple", "card lavender", "card baby-pink", "card skin-orange", "card lemon"];
    const random = Math.floor(Math.random() * colors.length);
    this.color = colors[random]
    return this.color
  }

  search(searchText: string, type: string) {
    if (searchText === '') { }
    else
      this.router.navigate(['search-product/' + type + "/" + searchText])
  }
}
