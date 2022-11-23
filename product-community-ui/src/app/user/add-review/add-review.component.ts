import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { Review } from 'src/app/model/review';
import { ProductService } from 'src/app/service/product.service';
import { ReviewService } from 'src/app/service/review.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.sass']
})
export class AddReviewComponent implements OnInit {
  color: string = 'card purple'
  productCode: string = '';
  productName: string = '';
  productBrand: string = '';
  rating: number = 1;
  image: string = '';
  productPrice: number = 0;

  newReview = new Review();

  constructor(private router: Router, private activaredRouter: ActivatedRoute, private reviewService: ReviewService,
    private productService: ProductService) { }

  reviewForm = new FormGroup({
    rating: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    comments: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(400)])
  })

  ngOnInit(): void {
    this.productService.getCurrentProduct(this.activaredRouter.snapshot.params['productCode']).
      subscribe((result: any) => {
        this.productCode = result.productCode;
        this.productName = result.productName;
        this.rating = result.rating;
        this.productPrice = result.productPrice;
        this.image = result.image;
        this.productBrand = result.productBrand;
      });
  }

  onSubmit() {
    var ratingString: string = this.reviewForm.value.rating as string
    var ratingNumber: number = +ratingString
    this.newReview.reviewTitle = this.reviewForm.value.title as string
    this.newReview.reviewDescription = this.reviewForm.value.comments as string
    this.newReview.reviewRating = ratingNumber
    this.newReview.productCode = this.productCode
    this.reviewService.addReview(this.newReview).subscribe((data: any) => {
      this.newReview = data
    }, (error) => {
      this.router.navigate(['error-page'])
    });
    this.navigateToAllProducts();
  }

  navigateToAllProducts() {
    this.router.navigate(['all-products'])
  }

  randomColor() {
    const colors = ["card purple", "card lavender", "card baby-pink", "card skin-orange", "card lemon"];
    const random = Math.floor(Math.random() * colors.length);
    this.color = colors[random]
    return this.color
  }

  get validRating() { return this.reviewForm.get('rating') }
  get validTitle() { return this.reviewForm.get('title') }
  get validComments() { return this.reviewForm.get('comments') }
}
