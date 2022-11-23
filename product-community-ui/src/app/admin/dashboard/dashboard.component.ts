import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { ReviewService } from 'src/app/service/review.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  successMessage: boolean = false;
  color: string = 'card purple'
  collection: any = []
  noOfReviews: number = 0
  noReviews: boolean = false

  constructor(private reviewService: ReviewService, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.adminService.reloadDashboard()
    this.getAllReviews();
  }

  getAllReviews() {
    this.reviewService.getReviews().subscribe((result: any) => {
      this.collection = result
      var countReview: number = 0;
      this.collection.forEach(function (item: any) {
        if (item.approved === false) {
          countReview += 1
        };
      });
      this.noOfReviews = countReview;
      if (this.noOfReviews == 0) {
        this.noReviews = true
      }
      else {
        this.noReviews = false
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
  
  adminLogout() {
    localStorage.removeItem('admin');
    this.router.navigate(['home'])
  }

  deleteReview(id: any) {
    this.reviewService.deleteReview(id).subscribe((result) => {
      this.getAllReviews()
    }, (error) => {
      this.router.navigate(['error-page'])
    })
  }

  approveReview(id: any) {
    this.reviewService.approveReview(id).subscribe((result) => {
      this.getAllReviews()
    }, (error) => {
      this.router.navigate(['error-page'])
    })
  }
}
