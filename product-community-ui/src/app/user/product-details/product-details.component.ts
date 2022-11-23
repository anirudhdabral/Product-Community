import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { ReviewService } from '../../service/review.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass']
})
export class ProductDetailsComponent implements OnInit {
  color: string = 'card purple'
  noOfReviews: number = 0;
  averageRating: number = 0;
  description: string = ''
  collection: any = []
  productCode: string = '';
  productName: string = '';
  productPrice: number = 0;
  image: string = '';

  constructor(private router: Router, private activaredRouter: ActivatedRoute, private productService: ProductService,
    private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.productService.getCurrentProduct(this.activaredRouter.snapshot.params['productCode']).
      subscribe((result: any) => {
        this.productCode = result.productCode;
        this.productName = result.productName;
        this.description = result.productDescription;
        this.productPrice = result.productPrice;
        this.averageRating = result.rating;
        this.image = result.image;
      }, (error) => {
        this.router.navigate(['error-page'])
      });
    this.reviewService.getReview(this.activaredRouter.snapshot.params['productCode']).
      subscribe((result: any) => {
        this.collection = result;
        var countReview: number = 0;
        this.collection.forEach(function (item: any) {
          if (item.approved === true) {
            countReview += 1;
          };
        });
        this.noOfReviews = countReview;
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

  navigateToAddReview() {
    this.router.navigate(['add-review']);
  }

}
