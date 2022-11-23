import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { ReviewService } from '../service/review.service';
import { StatsService } from '../service/stats.service';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  color: string = 'card purple'
  noOfReviews: number = 0
  noOfProducts: number = 0
  noOfUsers: number = 0
  collection: any = []

  constructor(private router: Router, private statsService: StatsService) { }

  ngOnInit(): void {
    this.statsService.getStats().subscribe((result) => {
      this.collection = result
      this.noOfProducts = this.collection.noOfProducts
      this.noOfReviews = this.collection.noOfReviews
      this.noOfUsers = this.collection.noOfUsers
    }, (error) => {
      this.router.navigate(['error-page'])
    });
  }

  navigateToDashboard() {
    this.router.navigate(['admin-dashboard'])
  }

  navigateToAllProducts() {
    this.router.navigate(['all-products']);
  }

}
