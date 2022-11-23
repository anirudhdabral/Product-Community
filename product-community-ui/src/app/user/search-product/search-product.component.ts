import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.sass']
})
export class SearchProductComponent implements OnInit {
  color: string = 'card purple'
  collection: any = []
  allProducts: any = []
  noResults:boolean = false
  searchedTerm:string = ""
  searchType:string = ""

  constructor(private router: Router, private productSerivice: ProductService, private activaredRouter: ActivatedRoute) { }

  ngOnInit(): void {
    let type = this.activaredRouter.snapshot.paramMap.get('searchType') as string;
    let query = this.activaredRouter.snapshot.paramMap.get('searchTerm') as string;
    this.searchedTerm = query
    this.searchType = type
    this.productSerivice.searchProduct(type,query).subscribe((result) => {
      this.collection = result;
      if(this.collection.length === 0){
        this.noResults = true
      }
    })
  }

  randomColor() {
    const colors = ["card purple", "card lavender", "card baby-pink", "card skin-orange", "card lemon"];
    const random = Math.floor(Math.random() * colors.length);
    this.color = colors[random]
    return this.color
  }

  navigateToAllProducts() {
    this.router.navigate(['all-products'])
  }

}
